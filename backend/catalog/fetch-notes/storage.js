'use strict';

const AWS = require("aws-sdk");

class NoteStorage {
  constructor(tableName) {
    this.tableName = tableName;
    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
  }

  async queryNotes(email) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'hashKey = :hkey',
      ExpressionAttributeValues: {
        ':hkey': `#USER#${email}`
      }
    }
    return this.dynamoClient.query(params).promise();
  }
}

module.exports = NoteStorage