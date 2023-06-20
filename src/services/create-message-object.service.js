exports.CreateObject = function (jsonBody) {
    return {
        email: jsonBody.email,
        nome: jsonBody.nome,
        sobrenome: jsonBody.sobrenome,
        identification: {
            type: 'CPF',
            number: jsonBody.cpf
        }
    };
}