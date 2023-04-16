// указание для редактора - искать неизвестные функции типы в пакете cypress
/// <reference types="cypress" />
Cypress.on('uncaught:exception', () => false); // устранение проблемы с кодом сайта cypress.io - в 2023 неактуально 
describe('my first cypress test ', () => {
    it('should subscribe to news letter', () => {
        cy.visit('https://www.cypress.io');
        cy.get('.footer-form > .border').scrollIntoView().click();
        cy.wait(1000);
        cy.get('#subscribe_email').type('akm86_fake@mail.ru');
        cy.get('div.flex > button').click();
        
        // тут проверка что все прошло
        //cy.contains('Thank you for subscribing!').should('be.visible');  // это простой вариант нахождение текста на странице вообще и чтобы был видимым
        cy.get('div.card-marketing-static > div > h2').should('have.text','Thank you for subscribing!'); // вариант - нахождения текста в определенном месте
        
    });
});