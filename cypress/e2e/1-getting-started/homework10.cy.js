    /// <reference types="cypress" />

    import {ApiHelper, apiHelper} from "../../support/apiHelper";
    
    describe("10homeworkLogin" , () => {
    beforeEach(() => {
    cy.loginByAPI();
    });

    it("First" , () => {
    cy.contains("Огляд").click();
    ApiHelper.getCategories().then(() => {
    cy.url().should('eq', 'http://5.189.186.217/overview');
    });
     });
     
    it("Second" , () => {
    cy.contains("Асортимент").click();
    apiHelper.getCategories().then(categories => {
    console.log(categories);
    });
    });
    
    
    });
// 5 Перевірка створених категорій


describe('CheckCategories', () => {
    beforeEach(() => {
    cy.navigateToOverviewPage();
    });
    it('Перевірка кількості категорій через API та інтерфейс', () => {
    cy.getCategories().then((apiResponse) => {
    const apiCategoryCount = apiResponse.body.length;
    // Отримати кількість категорій через інтерфейс та валідувати
    cy.get('.your-category-selector').should('have.length', apiCategoryCount);
    });
    });
    });
        