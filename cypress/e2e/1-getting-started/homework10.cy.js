    /// <reference types="cypress" />

    import {ApiHelper} from "../../support/apiHelper";
    
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
    apiHelper.getCategories().then(categories => {
    console.log(categories);
    });
    });
    
    
    });
// 5 Написати тест, який буде використовувати функцію (команду) з п3 для переходу 
// на сторінку overview, отримувати список створених категорій, використовуючи функцію (команду) 
// з п4, тобто через API, також переходити через юай у меню Асортимент і валідувати, що кількість 
// елементів списку на юаї відповідає кількості категорій, отриманих через API запит.


    it('CheckCategories', () => {
    cy.contains("Асортимент").click();
    cy.contains("Додади категорія").click();
    cy.get("input[type='file']").selectFile("cypress/media/photo.jpeg", {forse: true});
});

        