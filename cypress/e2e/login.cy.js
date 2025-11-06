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
    // --- GANTI DI SINI ---
    // Gunakan email dan password yang BARU SAJA Anda daftarkan:
    cy.get('input[id="email"]').type('akun-tester-ci@example.com')
    cy.get('input[id="password"]').type('password123')
    // --- GANTI DI SINI ---

    cy.get('button[type="submit"]').click()

    // Tes ini sekarang akan berhasil karena login akan sukses
    cy.url().should('eq', 'http://localhost:5173/')
    cy.get('nav').should('contain', 'Halo,')
  })
})