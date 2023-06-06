const validateUserObjectService = require('./services/validate-user-object.service');
const createUpdateCommand = require('./services/create-user-update-command.service');
const updateItemDynamoDbService = require('./services/update-item-dynamodb.service');

exports.lambdaHandler = async (event, context) => {

    const errors = validateUserObjectService.validateUserObject(event.body);
    if (errors.length > 0)
        return errorResult(400, errors);

    const updateUserCommand = createUpdateCommand.createUserUpdateCommand(event.body);
    try {
        await updateItemDynamoDbService.putUserOnDatabase(updateUserCommand);

        return defaultResult(200, {
            'Mensagem': 'Usuário ' + updateUserCommand.Key.email.S + ' atualizado com sucesso'
        });
    } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') {
            return errorResult(404, {
                'Mensagem': 'Usuário ' + updateUserCommand.Key.email.S + ' não encontrado'
            });
        }
        return errorResult(500, error);
    }
}

function errorResult(statusCode, errors) {
    return defaultResult(statusCode, {
        errors: errors
    });
}

function defaultResult(statusCode, object) {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify(object),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
}