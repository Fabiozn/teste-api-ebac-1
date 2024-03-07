/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {
    let token

    before(() => {

        cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn });
    });

    it('Deve listar usuários cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios',
            headers: { authorization: token },
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.usuarios).to.be.an('array');
        });
    });

    it('Deve validar contrato de usuários - Post', () => {
        cy.request('usuarios').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.usuarios).to.be.an('array');

        });
    });

    it('Deve cadastrar um usuário com sucesso', () => {
                cy.cadastrarUsuario(token, 'Fulano da Silva', 'fulano@qa.com', 'teste')
                    should((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
            });
    });

    it('Deve validar um usuário com email inválido', () => {
        const nome = 'Fulano da Silva' + Math.floor(Math.random() * 100000)
        cy.cadastrarUsuario(token, 'Fulano da Silva', 'fulaniqa.com', 'teste', 'true')
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property('message', 'email deve ser um email válido')
            });
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios/lblJVXiWh3qB9jus',
            headers: { authorization: token },
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('nome', 'Fulano da Silva');

        });
    });
    it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
        cy.request({
            method: 'DELETE',
            url: 'usuarios/lblJVXiWh3qB9jus',
            headers: { authorization: token },
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
        });
    });
                        
});
