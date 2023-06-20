const validateUserObjectService = require('./services/validate-user-object.service');
const createUpdateCommand = require('./services/create-user-update-command.service');
const updateItemDynamoDbService = require('./services/update-item-dynamodb.service');
const createObjectMessageService = require('./services/create-message-object.service');
const sendMessageService = require('./services/grava-mensagem-fila.service');

exports.lambdaHandler = async (event, context) => {

    const bodyJson = JSON.parse(event.body);
    const errors = validateUserObjectService.validateUserObject(bodyJson);
    if (errors.length > 0)
        return errorResult(400, errors);

    const updateUserCommand = createUpdateCommand.createUserUpdateCommand(bodyJson);
    try {
        await updateItemDynamoDbService.putUserOnDatabase(updateUserCommand);

        console.log('Criando objeto');
        const sendMessageObject = createObjectMessageService.CreateObject(bodyJson);
        const resultMensagem = await sendMessageService
            .GravarMensagem(JSON.stringify(sendMessageObject));

        console.log('Retornando');
        if (resultMensagem.MessageId) {
            return defaultResult(200, {
                'Mensagem': 'Usuário ' + updateUserCommand.Key.email.S + ' atualizado com sucesso'
            });
        }

        return errorResult(500, { 'Erro': 'Erro ao atualizar o usuário' });
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