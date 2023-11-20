    /// <reference types="cypress" />

    import {ApiHelper} from "../../support/apiHelper";
    import { DbHelper } from "../../support/dbHelper";
    
    
    describe("10homeworkLogin" , () => {
    beforeEach(() => {
    cy.loginByAPI();
    });

     // 3 частина 

    it("First" , () => {
    cy.contains("Огляд").click();
    ApiHelper.getCategories().then(() => {
    cy.url().should('eq', 'http://5.189.186.217/overview');
    });
     });
     
     // 4 Додатково вручну створити декілька категорій товарів у меню Асортимент, 
     // створити функцію, яка буде через API отримувати список цих категорій.

    it("Second" , () => {
    cy.contains("Асортимент").click();
    ApiHelper.getCategories().then(categories => {
    console.log(categories);
    });
    });
    // Створення категорії через UI з додавання картинки jpeg 
    it('CreateCategories', () => {
        cy.contains("Асортимент").click();
        cy.contains("Додати категорію").click();
        cy.get("input[type='file']").selectFile("cypress/photo/541430.jpeg", {forse: true});
        cy.contains("Зберегти зміни").click();
        // Додати позицію до категорії 
        DbHelper.createPosition().then((response) => {
            return response.body
        });
    });
    // Cтворення замовлення у меню Додати замовлення
    it('CreateOrder', () => {
        cy.contains("Додати замовлення").click();
        cy.contains("Trolleybus").click();
        cy.contains("Додати").click();
        cy.intercept('POST', 'http://5.189.186.217/api/order').as('createOrder');
        cy.wait('@createOrder').then((interception) => {
            const orderNumber = interception.response.body.order;
            // Перевірка, чи отримали номер замовлення
            expect(orderNumber).to.exist;
            cy.log(`Номер замовлення: ${orderNumber}`);
        });
    });
    // В меню Історія перевірити фільтр
    describe('Filter Order History', () => {
        it('should filter order history by order number', () => {
          // Зайти на сторінку історії замовлень
          cy.visit('http://5.189.186.217/history');
          // Перехоплення запиту на отримання історії замовлень
          cy.intercept('GET', 'http://5.189.186.217/api/order-history').as('getOrderHistory');
          // Клікнути на іконку фільтрації
          cy.get('.material-icons').contains('filter_list').click();
          // Заповнити форму фільтрації номером замовлення (2)
          cy.get('input[name="orderNumber"]').type('2');
          // Натискання кнопки "Фільтрувати"
          cy.contains('Применить фильтр').click();
          // Очікування на відповідь від сервера
          cy.wait('@getOrderHistory').then(() => {
          // Перевірка, чи в історії замовлень тепер присутнє тільки замовлення з номером 2
            cy.get('.order-item').should('have.length', 1);
            cy.get('.order-item').contains('Номер замовлення: 2');
          });
        });
      });

      // Видалити створену категорію, використовуючи UI
     it('DeleteCategory', () => {
        cy.contains("Додати замовлення").click();
        // Перехоплення запиту на отримання списку категорій
        cy.intercept('GET', 'http://5.189.186.217/api/categories').as('getCategories');
       // Знайти категорію за _id та клікнути на кнопку видалення
        const categoryId = '65358460146a28199b535fef'; //id
        cy.get(`[data-cy=${categoryId}] button.delete`).click();
       // Натискання на підтвердження видалення
        cy.get('.swal2-confirm').click();
       // Очікування на відповідь від сервера
       cy.wait('@getCategories').then(() => {
       // Перевірка, чи категорія більше не існує на сторінці
       cy.get(`[data-cy=${categoryId}]`).should('not.exist');
       });
       // Перевірка, чи категорія більше не існує у базі даних
       cy.request('http://5.189.186.217/api/categories').then((response) => {
       // Перевірка, чи категорія з заданим _id більше не присутня в відповіді
       expect(response.body).to.not.include({ _id: categoryId });
     });
  });
});
       
        
        


    






   
        