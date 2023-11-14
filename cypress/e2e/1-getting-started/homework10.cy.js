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
    ApiHelper.getCategories().then(categories => {
    console.log(categories);
    });
    });
    // 5 Написати тест, який буде використовувати функцію (команду) з п3 для переходу 
    it('CheckCategories', () => {
        cy.contains("Асортимент").click();
        cy.contains("Додади категорія").click();
        cy.get("input[type='file']").selectFile("cypress/media/photo.jpeg", {forse: true});
    });
    });




   
        