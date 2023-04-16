describe('Shop', function () {

    it('End to End: зайти, выбирать, положить в корзину, добавить, оформить ', function () {
        cy.clearCookies();
        cy.visit('https://huntingpony.com/');
        cy.get('#splide02-slide02 .product-preview__img-1').click();

        //cy.intercept('/?wc-ajax=get_refreshed_fragments').as('ajax-reload');
        //cy.intercept('POST', '/product/**').as('ajax-product');
        cy.wait(2000);
        //cy.get('//button/span[text()="В корзину"]').click();            need XPath plugin
        cy.get('button.button > span.add-cart-counter__btn-label').click();
        
        //cy.wait('@ajax-product');
        //cy.wait('@ajax-reload');

        cy.wait(2000)
        cy.get('button[data-add-cart-counter-plus]').click();
        cy.wait(1000)
        cy.get('div.header__area-controls > a.header__control-btn.header__cart').click();
        cy.wait(1000)
        cy.get('button[data-cart-submit]').click();
        cy.wait(2000)
        cy.contains('Оформление заказа').should('be.visible');
    })

})

