describe('API Testing', () => {
  it('Request 01 - List Categories', () => {
    cy.request({
      method: 'GET', 
      url: 'https://api.escuelajs.co/api/v1/categories'
    })
    .then((response) => {

        expect(response.status).to.eq(200)
        expect(response.duration).to.be.lessThan(1000)
        expect(response.body).to.be.an('array')
        expect(response.body).to.have.length.greaterThan(0)
        expect(response.body[0]).to.have.property('id')
        expect(response.body[0]).to.have.property('name')
    })
  })

  it('Request 02 - List Categories Limit 5', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories?limit=5'
    })
    .then((response) => {

        expect(response.status).to.eq(200)
        expect(response.duration).to.be.lessThan(1000)
        expect(response.body).to.be.an('array')
        expect(response.body).to.have.length.greaterThan(0)
        expect(response.body[0]).to.have.property('id')
        expect(response.body[0]).to.have.property('name')
        expect(response.body).to.have.length(5)
    })
  })

  it('Request 03 - List Categories Offset 0 Limit 5', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories?offset=0&limit=5'
    })
    .then((response) => {

        expect(response.status).to.eq(200)
        expect(response.duration).to.be.lessThan(1000)
        expect(response.body).to.be.an('array')
        expect(response.body).to.have.length.greaterThan(0)
        expect(response.body[0]).to.have.property('id')
        expect(response.body[0]).to.have.property('name')
        expect(response.body).to.have.length(5)
    })
  })

  it('Request 04 - Category ID 1', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/1'
    })
    .then((response) => {

        expect(response.status).to.eq(200)
        expect(response.duration).to.be.lessThan(1000)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('name')
        expect(response.body.id).to.eq(1)
    })
  })

  it('Request 05 - Category ID 2', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/2'
    })
    .then((response) => {

        expect(response.status).to.eq(200)
        expect(response.duration).to.be.lessThan(1000)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('name')
        expect(response.body.id).to.eq(2)
    })
  })

  it('Request 06 - Category ID 3', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/3'
    })
    .then((response) => {

        expect(response.status).to.eq(200)
        expect(response.duration).to.be.lessThan(1000)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('name')
        expect(response.body.id).to.eq(3)
    })
  })

  it('Request 07 - POST Category', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/categories',
      body: {
        name: 'Kategori Seram',
        image: 'https://placeimg.com/640/480/any'
      }
    })
    .then((response) => {

        expect(response.status).to.eq(201)
        expect(response.duration).to.be.lessThan(1000)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq('Kategori Seram')
    })
  })

  it('Request 08 - DELETE Category ID', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://api.escuelajs.co/api/v1/categories/55'
    })
    .then((response) => {

        expect(response.status).to.eq(200)
        expect(response.duration).to.be.lessThan(1000)
        expect(response.body).to.eq('true')
    })
  })

  it('Request 09 - Validate Category ID 1', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/1'
    })
    .then((response) => {

        expect(response.status).to.eq(200)
        expect(response.duration).to.be.lessThan(1000)
        expect(response.body).to.have.property('name')
        expect(response.headers['content-type']).to.include('application/json')
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('name')
        expect(response.body.id).to.be.a('number')
        expect(response.body.name).to.be.a('string')
    })
  })

  it('Request 10 - GET Categories Limit 10', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories?limit=10'
    })
    .then((response) => {

      expect(response.status).to.eq(200)
      expect(response.duration).to.be.lessThan(1000)
      expect(JSON.stringify(response.body)).to.include('name')
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.at.most(10)
    })
  })

  it('Request 11 - Pagination Offset 5', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories?offset=5&limit=5'
    })
    .then((response) => {

      expect(response.status).to.eq(200)
      expect(response.duration).to.be.lessThan(1000)
      expect(JSON.stringify(response.body)).to.include('name')
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.at.most(5)
    })
  })

  it('Request 12 - Invalid Category ID', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/9999',
      failOnStatusCode: false
    })
    .then((response) => {

      expect(response.status).to.eq(400)
      expect(response.duration).to.be.lessThan(1000)
      expect(response.body).to.not.be.empty
      expect(response.headers['content-type']).to.include('application/json')
    })
  })
})