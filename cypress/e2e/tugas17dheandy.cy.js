import loginPage from "../support/pageObjects/loginPage"
import loginData from "../fixtures/loginData.json"

describe ('Verifikasi User Berhasil Login', () => {
  it('TC-LG-001 Login dengan Username valid dan Password valid', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.inputUsername(loginData.validUsername)
    loginPage.inputPassword(loginData.validPassword)
    loginPage.clickLoginButton()
    loginPage.verifyErrorMessageNotExists()
    loginPage.verifyDashboardPage()
  })
})

describe ('Verifikasi User Gagal Login', () => {
  it('TC-LG-002 Login dengan Username dan Password kosong', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.clickLoginButton()
    loginPage.verifyInputError()
    loginPage.verifyUrlLoginPage()
  })
  it('TC-LG-003 Login dengan Username valid dan Password kosong', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.inputUsername(loginData.validUsername)
    loginPage.clickLoginButton()
    loginPage.verifyInputError()
    loginPage.verifyUrlLoginPage()
  })
  it('TC-LG-004 Login dengan Username kosong dan Password valid', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.inputPassword(loginData.validPassword)
    loginPage.clickLoginButton()
    loginPage.verifyInputError()
    loginPage.verifyUrlLoginPage()
  })
  it('TC-LG-005 Login dengan Username tidak valid dan Password valid', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.inputUsername(loginData.invalidUsername)
    loginPage.inputPassword(loginData.validPassword)
    loginPage.clickLoginButton()
    loginPage.verifyInvalidCredentialsError()
    loginPage.verifyUrlLoginPage()
  })
  it('TC-LG-006 Login dengan Username valid dan Password tidak valid', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.inputUsername(loginData.validUsername)
    loginPage.inputPassword(loginData.invalidPassword)
    loginPage.clickLoginButton()
    loginPage.verifyInvalidCredentialsError()
    loginPage.verifyUrlLoginPage()
  })
  it('TC-LG-007 Login dengan Username tidak valid dan Password tidak valid', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.inputUsername(loginData.invalidUsername)
    loginPage.inputPassword(loginData.invalidPassword)
    loginPage.clickLoginButton()
    loginPage.verifyInvalidCredentialsError()
    loginPage.verifyUrlLoginPage()
  })
})

describe ('Verifikasi Forgot Password', () => {
  it('TC-LG-008 Text Link Forgot Password mengarahkan ke halaman Reset Password', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.clickForgotPasswordLink()
    loginPage.verifyForgotPasswordPage()
    loginPage.clickButtonResetPassword()
    loginPage.verifyInputError()
    loginPage.verifyForgotPasswordPage()
  })
  it('TC-LG-009 Reset password tanpa mengisi username', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.clickForgotPasswordLink()
    loginPage.verifyForgotPasswordPage()
    loginPage.clickButtonResetPassword()
    loginPage.verifyInputError()
    loginPage.verifyForgotPasswordPage()
  })
  it('TC-LG-010 Reset password dengan username valid', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.clickForgotPasswordLink()
    loginPage.verifyForgotPasswordPage()
    loginPage.inputUsername(loginData.validUsername)
    loginPage.clickButtonResetPassword()
  })
})

describe ('Verifikasi Password Security dan Login Session', () => {
  it('TC-LG-011 Verifikasi Password terenkripsi pada field Password', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.inputPassword(loginData.validPassword)
    loginPage.verifyPasswordFieldType()
  })
  it('TC-LG-012 Verifikasi Akses halaman Dashboard sesudah menekan tombol back dan forward browser', () => {
    loginPage.visitAndVerifyLoginPage(loginData.urlLogin)
    loginPage.inputUsername(loginData.validUsername)
    loginPage.inputPassword(loginData.validPassword)
    loginPage.clickLoginButton()
    loginPage.verifyErrorMessageNotExists()
    loginPage.verifyDashboardPage()
    loginPage.clickBackAndForwardBrowser()
    loginPage.verifyDashboardPage()
    loginPage.reloadPage()
    loginPage.verifyDashboardPage()
  })
})