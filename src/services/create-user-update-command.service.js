exports.createUserUpdateCommand = function (user) {
    return {
        Key: {
            "email": {
                S: user.email
            }
        },
        ExpressionAttributeNames: {
            "#nome": "nome",
            "#sobrenome": "sobrenome",
            "#cpf": "cpf",
            "#email": "email"
        },
        ExpressionAttributeValues: {
            ":nome": user.nome,
            ":sobrenome": user.sobrenome,
            ":cpf": user.cpf,
            ":email": user.email
        },
        UpdateExpression: "SET #nome = :nome, #sobrenome = :sobrenome, #cpf = :cpf",
        ConditionExpression: "#email = :email"
    };
}