describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('a[href="/login"]').click()
  })

  it('should display login page correctly', () => {
    cy.get('input[id="email"]').should('be.visible')
    cy.get('input[id="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('contain', 'Login')
  })

  it('should show alert on failed login', () => {
    cy.get('input[id="email"]').type('wrong@example.com')
    cy.get('input[id="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    cy.on('window:alert', (str) => {
      expect(str).to.contain('Login gagal')
    })
  })

  it('should login successfully with correct credentials', () => {
    // --- GANTI DI SINI DENGAN AKUN ASLI YANG ANDA BUAT ---
    cy.get('input[id="email"]').type('tes-final-aprido@example.com') // <-- GANTI DENGAN EMAIL ASLI ANDA
    cy.get('input[id="password"]').type('passwordfinal123') // <-- GANTI DENGAN PASSWORD ASLI ANDA
    // --- GANTI DI SINI ---

    cy.get('button[type="submit"]').click()

    // Tes ini HANYA akan lolos jika login di atas berhasil
    cy.url().should('eq', 'http://localhost:5173/')
    cy.get('nav').should('contain', 'Halo,')
  })
})