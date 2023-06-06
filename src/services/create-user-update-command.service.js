exports.createUserUpdateCommand = function (user) {
    return {
        Key: {
            "email": {
                S: user.email
            }
        },
        ExpressionAttributeValues: {
            ":nome": { S: user.nome },
            ":sobrenome": { S: user.sobrenome },
            ":cpf": { S: user.cpf }
        },
        UpdateExpression: "SET nome = :nome, sobrenome = :sobrenome, cpf = :cpf",
    };
}