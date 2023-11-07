/// <reference types="cypress" />
import { ApiHelper } from "./apiHelper";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


        //Логування та отримання токена 
    Cypress.Commands.add('loginByAPI', () => {
      ApiHelper.getToken().then((token) => {
        cy.visit('http://5.189.186.217/overview', {
            onBeforeLoad(win) {
                win.localStorage.SetItem("auth-token", token);
                } 
        });
    });
      });

// Команда для отримання списку категорій товарів


Cypress.Commands.add('getCategories', () => {
    const token = window.localStorage.getItem('token');
    cy.request({
    method: 'GET',
    url: 'http://5.189.186.217/api/position',
    headers: {
    Authorization: `Bearer ${token}`,
    },
    });
    });
            