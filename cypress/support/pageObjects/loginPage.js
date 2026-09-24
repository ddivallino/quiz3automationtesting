class loginPage {
    visitAndVerifyLoginPage(urlLogin) {
        cy.visit(urlLogin)
        cy.get('.oxd-text--h5').should('be.visible')
    }

    inputUsername(username) {
        cy.get('[name="username"]').type(username)
    }

    inputPassword(password) {
        cy.get('[name="password"]').type(password)
    }

    clickLoginButton() {
        cy.get('.oxd-button').click()
    }

    verifyErrorMessageNotExists() {
        cy.get('.oxd-alert').should('not.exist')
    }

    verifyDashboardPage() {
        cy.url({timeout: 10000}).should('include', 'dashboard')
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
        cy.get('.oxd-userdropdown-img').should('be.visible')
        cy.get('.oxd-userdropdown-name').should('be.visible')
    }

    verifyInputError() {
        cy.get('.oxd-input--error').should('exist')
        cy.get('.oxd-input-field-error-message').should('exist')
    }

    verifyUrlLoginPage() {
        cy.url().should('include', 'login')
    }

    verifyInvalidCredentialsError() {
        cy.get('.oxd-alert').should('be.visible').and('contain.text', 'Invalid credentials')
    }

    clickForgotPasswordLink() {
        cy.get('.orangehrm-login-forgot > .oxd-text').click()
    }

    verifyForgotPasswordPage() {
        cy.get('.oxd-text--h6').should('be.visible')
        cy.url().should('include', 'Reset')
    }

    clickButtonResetPassword() {
       cy.get('.oxd-button--secondary').click()
    }

    verifyPasswordFieldType() {
        cy.get('[name="password"]').should('have.attr', 'type', 'password')
    }

    clickBackAndForwardBrowser() {
        cy.go('back')
        cy.go('forward')
    }

    reloadPage() {
        cy.reload()
    }
}

export default new loginPage()