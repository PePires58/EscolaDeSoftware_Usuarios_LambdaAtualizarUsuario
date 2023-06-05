const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.putUserOnDatabase = async function (putItemCommand) {
    const params = {
        ExpressionAttributeNames: putItemCommand.ExpressionAttributeNames,
        ExpressionAttributeValues: putItemCommand.ExpressionAttributeValues,
        Key: putItemCommand.Key,
        TableName: process.env.TableName,
        ReturnConsumedCapacity: "TOTAL",
        ConditionExpression: putItemCommand.ConditionExpression
    };

    return await dynamodb.updateItem(params)
        .promise()
        .then((data) => {
            return data;
        });
}