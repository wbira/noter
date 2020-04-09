'use strict';

const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();;
const TableName = process.env.TABLE_NAME


function createResponse(body, statusCode) {
    return {
        body,
        statusCode
    }
}

exports.lambdaHandler = async (event, context) => {
    console.log("Event:", event)
    const params = {
        TableName,
        KeyConditionExpression: 'hashKey = :hkey',
        ExpressionAttributeValues: {
            ':hkey': 'first'
        }
    }
    let response
    try {
        const result = await client.query(params).promise()
        console.log("Result", result)
        if (result.Items) {
            response = createResponse(JSON.stringify({
                notes: result.Items,
            }), 200)
        } else {
            response = createResponse("Not Found", 404)
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
