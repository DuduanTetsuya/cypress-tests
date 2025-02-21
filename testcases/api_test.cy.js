describe('API Testing with Cypress', () => {
    it('Should fetch all users', () => {
      cy.request('GET', 'https://jsonplaceholder.typicode.com/users')
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.length(10);
        });
    });
    it('Should create a new user', () => {
        cy.request('POST', 'https://jsonplaceholder.typicode.com/users', {
          name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com'
        }).should((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('id');
        });
      });
    it('Should update a user', () => {
        cy.request('PUT', 'https://jsonplaceholder.typicode.com/users/1', {
          name: 'Jane Doe'
        }).should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.name).to.eq('Jane Doe');
        });
      });
    it('Should delete a user', () => {
        cy.request('DELETE', 'https://jsonplaceholder.typicode.com/users/1')
          .should((response) => {
            expect(response.status).to.eq(200);
          });
      });        
  });
  