describe('Форма логина и пароля', function () {

        it('правильный логин, правильный пароль', function () {
                cy.clearCookies();
                cy.visit('https://login.qa.studio');

                cy.get('#mail').type('german@dolnikov.ru');
                cy.get('#pass').type('iLoveqastudio1');
                cy.get('#loginButton').click();

                cy.contains('Авторизация прошла успешно').should('be.visible');
                cy.get('#exitMessageButton > .exitIcon').should('be.visible');
                cy.get('#exitMessageButton > .exitIcon').click();
                cy.contains('Форма логина').should('be.visible');
                })

        it('проверка логики восстановления пароля', function () {
                cy.visit('https://login.qa.studio');
                cy.get('#forgotEmailButton').click();
                cy.get('#mailForgot').type('german@dolnikov.ru');
                cy.get('#restoreEmailButton').click();
                cy.contains('Успешно отправили пароль на e-mail').should('be.visible');
                })

        it('правильный логин, НЕ правильный пароль', function () {
                cy.visit('https://login.qa.studio');
                cy.get('#mail').type('german@dolnikov.ru');
                cy.get('#pass').type('iLikeqastudio1');
                cy.get('#loginButton').click();
                cy.contains('Такого логина или пароля нет').should('be.visible');
                cy.get('#exitMessageButton > .exitIcon').should('be.visible');
                })

        it('НЕ правильный логин, правильный пароль', function () {
                cy.visit('https://login.qa.studio');
                cy.get('#mail').type('germann@dolnikov.ru');
                cy.get('#pass').type('iLoveqastudio1');
                cy.get('#loginButton').click();
                cy.contains('Такого логина или пароля нет').should('be.visible');
                cy.get('#exitMessageButton > .exitIcon').should('be.visible');
                })

        it('проверка на негативный кейс валидации', function () {
                cy.visit('https://login.qa.studio');
                cy.get('#mail').type('germandolnikov.ru');
                cy.get('#pass').type('iLoveqastudio1');
                cy.get('#loginButton').click();
                cy.contains('Нужно исправить проблему валидации').should('be.visible');
                cy.get('#exitMessageButton > .exitIcon').should('be.visible');
                })

        it('проверка на негативный кейс валидации', function () {
                cy.visit('https://login.qa.studio');
                cy.get('#mail').type('GerMan@Dolnikov.ru');
                cy.get('#pass').type('iLoveqastudio1');
                cy.get('#loginButton').click();
                cy.contains('Авторизация прошла успешно').should('be.visible');
                cy.get('#exitMessageButton > .exitIcon').should('be.visible');
                })
        





})