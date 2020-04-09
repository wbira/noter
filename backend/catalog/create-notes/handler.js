'use strict';

const AWS = require("aws-sdk");
const uuid = require("uuid");
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
    console.log("Ctx:", context)

    const { note } = JSON.parse(event.body);
    const item = {
        hashKey: uuid(),
        note
    }
    const params = {
        TableName,
        Item: item
    };
    let response
    try {
        await client.put(params).promise()
        response = createResponse(JSON.stringify(item), 201)
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
