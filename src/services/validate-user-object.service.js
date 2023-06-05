exports.validateUserObject = function (user) {
    let errors = [];

    if (!user || Object.keys(user).length === 0) {
        errors.push('Objeto de usuário é obrigatório');
    }
    else {
        if (!user.email)
            errors.push('Email do usuário é obrigatório');
        if (!user.nome)
            errors.push('Nome do usuário é obrigatório');
        if (!user.sobrenome)
            errors.push('Sobrenome do usuário é obrigatório');
        if (!user.cpf)
            errors.push('CPF do usuário é obrigatório');
    }

    return errors;
}