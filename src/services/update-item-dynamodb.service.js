const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.putUserOnDatabase = async function (putItemCommand) {
    const params = {
        ExpressionAttributeValues: putItemCommand.ExpressionAttributeValues,
        Key: putItemCommand.Key,
        TableName: process.env.TableName,
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(params);

    return await dynamodb.updateItem(params)
        .promise()
        .then((data) => {
            return data;
        });
}