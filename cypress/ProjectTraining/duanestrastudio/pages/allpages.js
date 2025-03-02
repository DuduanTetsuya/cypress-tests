class allpages{
    homePage(){
        cy.visit('https://duanestrastudio.com/');
        cy.get('img[src="assets/img/logo.png"]').should('be.visible');
        cy.get('img[src="assets/img/play-the-game.png"]').should('be.visible');
        cy.get('.nav-link').contains('Home').should('be.visible');
        cy.get('.nav-link').contains('About Me').should('be.visible');
        cy.get('.nav-link').contains('Events').should('be.visible');
        cy.get('.nav-link').contains('Terms and Condition').should('be.visible');
        cy.get('.nav-link').contains('Privacy Policy').should('be.visible');
        cy.get('.nav-link').contains('Contact Us').should('be.visible');
        cy.contains('.lead', 'We are creating games and apps which can boost your joy, make your day, and fill your life with a smile.');
        cy.get('img[src="assets/img/our-game.png"]').should('be.visible');
        cy.get('[style="text-align: center; margin-bottom:10px;"] > a > .my-0').should('be.visible');
        cy.get('[style="text-align: center;"] > a > .my-0').should('be.visible');
        cy.get(':nth-child(1) > .video-container > iframe').should('be.visible');
        cy.get(':nth-child(2) > .video-container > iframe').should('be.visible');
        cy.contains(':nth-child(1) > .d-block', 'Duanestra Studio 2020');
    }

    aboutMePage(){
        cy.get('.nav-link').contains('About Me').click();
        cy.get('.display-4').contains('About Me').should('be.visible');
        cy.get('.about-me-photo').should('be.visible');
        cy.get('.about-me-text > :nth-child(1)').contains('Hello, my name is Febri, and I am the founder and developer at Duanestra Studio.').should('be.visible');
        cy.get('.about-me-text > :nth-child(2)').contains('With a passion for IT, problem-solving, and').should('be.visible');
        cy.get('.about-me-text > :nth-child(3)').contains('When I’m not coding, I enjoy cycling and').should('be.visible');
        cy.get('.pricing-header > :nth-child(4)').contains('Feel free to reach out if you').should('be.visible');
        
    }
}

export default new allpages();