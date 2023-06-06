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
            ":cpf": { S: user.cpf },
            ":email": { S: user.email }
        },
        UpdateExpression: "SET nome = :nome, sobrenome = :sobrenome, cpf = :cpf",
        ConditionExpression: "attribute_exists(email) AND email = :email"
    };
}