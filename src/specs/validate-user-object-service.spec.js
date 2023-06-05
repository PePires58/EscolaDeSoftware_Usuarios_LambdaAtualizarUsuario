const assert = require('assert').strict;
const validateUserObjectService = require('../services/validate-user-object.service');

describe('Validate user Object Service tests', function () {
    it('Should have an error "Objeto de usuário é obrigatório"', function () {

        const errors = validateUserObjectService.validateUserObject({});

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Objeto de usuário é obrigatório"));
    });

    it('Should have an error "Email do usuário é obrigatório"', function () {
        const userInput = {
            email: ''
        }

        const errors = validateUserObjectService.validateUserObject(userInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Email do usuário é obrigatório"));
    });

    it('Should have an error "Nome do usuário é obrigatório"', function () {
        const userInput = {
            email: 'pedrao@gmail.com'
        }

        const errors = validateUserObjectService.validateUserObject(userInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Nome do usuário é obrigatório"));
    });

    it('Should have an error "Sobrenome do usuário é obrigatório"', function () {
        const userInput = {
            email: 'pedrao@gmail.com',
            nome: 'pedrao'
        }

        const errors = validateUserObjectService.validateUserObject(userInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Sobrenome do usuário é obrigatório"));
    });

    it('Should have an error "CPF do usuário é obrigatório"', function () {
        const userInput = {
            email: 'pedrao@gmail.com',
            nome: 'pedrao',
            sobrenome: 'pires'
        }

        const errors = validateUserObjectService.validateUserObject(userInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "CPF do usuário é obrigatório"));
    });

    it('Should not have errors', function () {
        const userInput = {
            email: 'pedrao@gmail.com',
            nome: 'pedrao',
            sobrenome: 'pires',
            cpf: '11122233311'
        }

        const errors = validateUserObjectService.validateUserObject(userInput);

        assert.equal(0, errors.length);
    });
});