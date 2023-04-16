import { AuthPage } from '../../helpers/auth.page'

describe("Тесты авторизации", () => {
    const pageAuth = new AuthPage();

    beforeEach(() => {
        cy.intercept('POST', 'trainers/auth').as('postAuth');
        cy.visit("/")
    });

    it("Авторизация с корректными логином и паролем", () => {
        //cy.intercept('GET', 'pokemons?*').as('getPokemons'); // запрашиваем авторизацию с введенными данными
        //cy.intercept('POST', 'trainers/auth').as('postAuth');  // отправляем авторизационные данные
        pageAuth.typeInField(0, Cypress.env().login);
        pageAuth.typeInField(1, Cypress.env().password);
        pageAuth.clickButton('buttonEnter');
        //cy.wait('@getPokemons');  // ждем когда придёт новая страница после авторизации
        cy.wait('@postAuth').its('respons.statusCode').should('eq', 200); // ждем чтобы ответ содержал статус 200
    });

    it("Авторизация с пустыми полями", () => {
        pageAuth.typeInField(0, '{backspace}'); // вводим нажатие клавиши backspace чтобы оставить поле пустым
        pageAuth.typeInField(1, '{backspace}');// вводим нажатие клавиши backspace чтобы оставить поле пустым
        pageAuth.clickButton('buttonEnter');

        pageAuth.checkElemText('errorText', 'Введите почту'); // проверка наличия текста под полем, индекс не передаём - он по умолчанию 0
        pageAuth.checkElemText('errorText', 'Введите пароль', 1); // проверка наличия текста под полем
        pageAuth.checkCssForValue('errorText', 'color', pageAuth.base.error_color); // проверка цветая текста
        pageAuth.checkCssForValue('errorText', 'color', pageAuth.base.error_color, 1); // проверка цвета текста
    });

    it("Авторизация с неккоректной почтой", () => {
        pageAuth.typeInField(0, 'authtestmail.ru');
        pageAuth.typeInField(1, Cypress.env().password);
        pageAuth.clickButton('buttonEnter');

        pageAuth.checkElemText('errorText', 'Введите почту'); // проверка наличия текста под полем, индекс не передаём - он по умолчанию 0
        pageAuth.checkCssForValue('errorText', 'color', pageAuth.base.error_color); // проверка цветая текста
    });

    it("Авторизация с ошибкой пароля", () => {
        pageAuth.typeInField(0, Cypress.env().login);
        pageAuth.typeInField(1, 'qwerty');
        pageAuth.clickButton('buttonEnter');

        cy.wait('@postAuth').its('respons.statusCode').should('eq', 400); // ждем чтобы ответ содержал статус 400
        pageAuth.checkElemText('errorText', 'Неверны логи или пароль', 2); // проверка наличия текста под полем, индекс 2 - так как элемент в доме под таким индексом
        pageAuth.checkCssForValue('errorText', 'color', pageAuth.base.error_color, 2); // проверка цветая текста
    });

    // параметризированные тесты
    [
        ["Авторизация с корректными логином и паролем",
            '{backspace}',
            '{backspace}',
            [
                [0, 'Введите почту'],
                [1, 'Введите пароль']
            ]
        ],
        ["Авторизация с неккоректной почтой", 'authtestmail.ru', Cypress.env().password,
            [[0, 'Введите почту']]
        ],
        ["Авторизация с ошибкой пароля", Cypress.env().login, 'qwerty',
            [[2, 'Неверный логин или пароль']],
        ],
    ].forEach((type) => {
        it.only(type[0], () => {
            pageAuth.typeInField(0, type[1]);
            pageAuth.typeInField(0, type[2]);
            pageAuth.clickButton('buttonEnter');


            if (type[0].includes("Авторизация с ошибкой пароля")) 
            cy.wait('@postAuth').its('respons.statusCode').should('eq', 400);


            type[3].forEach(error => {
                pageAuth.checkElemText('errorText', error[1], error[0]);
                pageAuth.checkCssForValue('errorText', 'color', pageAuth.base.error_color, error[0]);
            })

            
        });
    });

});