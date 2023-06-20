const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

exports.GravarMensagem = async function (mensagem) {
    let urlFila = await buscaUrlFila();

    const params = {
        MessageBody: mensagem,
        QueueUrl: urlFila.QueueUrl
    };

    return await sqs.sendMessage(params)
        .promise()
        .then((result) => { return result });
}

async function buscaUrlFila() {
    const params = {
        QueueName: process.env.NomeFilaSqs
    };

    return await sqs.getQueueUrl(params)
        .promise()
        .then((data) => {
            return data
        });
}