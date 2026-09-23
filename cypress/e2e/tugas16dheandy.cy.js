describe ('Verifikasi User Berhasil Login', () => {
  it('TC-LG-001 Login dengan Username valid dan Password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.oxd-text--h5').should('be.visible')
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')

    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary'
    ).as('ActionSummary')

    cy.get('.oxd-button').click()
    cy.get('.oxd-alert').should('not.exist')
    cy.url({timeout: 10000}).should('include', 'dashboard')
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
    cy.get('.oxd-userdropdown-img').should('be.visible')
    cy.get('.oxd-userdropdown-name').should('be.visible')

    cy.wait('@ActionSummary').its('response.statusCode').should('eq', 200)
  })

  it('TC-LG-002 Verifikasi Berhasil Login diarahkan ke Halaman Dashboard', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.oxd-text--h5').should('be.visible')
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')

    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
    ).as('DashboardPage')

    cy.get('.oxd-button').click()
    cy.get('.oxd-alert').should('not.exist')
    cy.url({timeout: 10000}).should('include', 'dashboard')
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
    cy.get('.oxd-userdropdown-img').should('be.visible')
    cy.get('.oxd-userdropdown-name').should('be.visible')

    cy.wait('@DashboardPage').its('response.statusCode').should('eq', 200)
  })

  it('TC-LG-003 Verifikasi Berhasil Login dengan Response Sub Unit', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.oxd-text--h5').should('be.visible')
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')

    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit'
    ).as('SubUnit')

    cy.get('.oxd-button').click()
    cy.get('.oxd-alert').should('not.exist')
    cy.url({timeout: 10000}).should('include', 'dashboard')
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
    cy.get('.oxd-userdropdown-img').should('be.visible')
    cy.get('.oxd-userdropdown-name').should('be.visible')

    cy.wait('@SubUnit').its('response.statusCode').should('eq', 200)
  })
})

describe ('Verifikasi User Gagal Login', () => {
  it('TC-LG-004 Login dengan Username tidak valid dan Password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.oxd-text--h5').should('be.visible')
    cy.get('[name="username"]').type('Agus@998')
    cy.get('[name="password"]').type('admin123')

    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'
    ).as('Messages')

    cy.get('.oxd-button').click()
    cy.get('.oxd-alert', {timeout: 10000}).should('be.visible').and('contain.text', 'Invalid credentials')
    cy.url().should('include', 'login')

    cy.wait('@Messages').its('response.statusCode').should('eq', 304)
  })
  it('TC-LG-005 Login dengan Username valid dan Password tidak valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.oxd-text--h5').should('be.visible')
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('Agus@998')

    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    ).as('LoginPage')

    cy.get('.oxd-button').click()
    cy.get('.oxd-alert').should('be.visible').and('contain.text', 'Invalid credentials')
    cy.url().should('include', 'login')

    cy.wait('@LoginPage').its('response.statusCode').should('eq', 200)
  })
  it('TC-LG-006 Login dengan Username tidak valid dan Password tidak valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.oxd-text--h5').should('be.visible')
    cy.get('[name="username"]').type('Agus@998')
    cy.get('[name="password"]').type('admin998')

    cy.intercept(
      'POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate'
    ).as('Validate')

    cy.get('.oxd-button').click()
    cy.get('.oxd-alert').should('be.visible').and('contain.text', 'Invalid credentials')
    cy.url().should('include', 'login')

    cy.wait('@Validate').its('response.statusCode').should('eq', 302)
  })
})

describe ('Verifikasi Forgot Password', () => {
  it('TC-LG-007 Text Link Forgot Password mengarahkan ke halaman Reset Password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.oxd-text--h5').should('be.visible')

    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode'
    ).as('ResetPasswordPage')
    
    cy.get('.orangehrm-login-forgot > .oxd-text').click()
    cy.get('.oxd-text--h6').should('be.visible')
    cy.url().should('include', 'Reset')

    cy.wait('@ResetPasswordPage').its('response.statusCode').should('eq', 200)
  })
  
  it('TC-LG-008 Reset password dengan username valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.oxd-text--h5').should('be.visible')
    cy.get('.orangehrm-login-forgot > .oxd-text').click()
    cy.get('.oxd-text--h6').should('be.visible')
    cy.url().should('include', 'Reset')
    cy.get('[name="username"]').type('Admin')

    cy.intercept(
      'POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestResetPassword'
    ).as('ResetPassword')

    cy.get('.oxd-button--secondary').click()

    cy.wait('@ResetPassword').its('response.statusCode').should('eq', undefined)
  })
})

describe ('Verifikasi Password Security dan Login Session', () => {
  it('TC-LG-009 Verifikasi Akses halaman Dashboard sesudah menekan tombol back dan forward browser', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.oxd-text--h5').should('be.visible')
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')
    cy.get('.oxd-button').click()
    cy.get('.oxd-alert').should('not.exist')
    cy.url({timeout: 10000}).should('include', 'dashboard')
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
    cy.get('.oxd-userdropdown-img').should('be.visible')
    cy.get('.oxd-userdropdown-name').should('be.visible')
    cy.go('back')
    cy.go('forward')
    cy.url().should('include', 'dashboard')
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
    cy.get('.oxd-userdropdown-img').should('be.visible')
    cy.get('.oxd-userdropdown-name').should('be.visible')

    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts'
    ).as('Shortcuts')

    cy.reload()
    cy.url({timeout: 20000}).should('include', 'dashboard')
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
    cy.get('.oxd-userdropdown-img').should('be.visible')
    cy.get('.oxd-userdropdown-name').should('be.visible')

    cy.wait('@Shortcuts').its('response.statusCode').should('eq', 200)
  })
})