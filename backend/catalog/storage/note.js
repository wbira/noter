'use strict';

const AWS = require("aws-sdk");
const uuid = require("uuid");

class NoteStorage {
  constructor(tableName) {
    this.tableName = tableName
    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
  }

  async persistNote(email, note, expirationTime) {
    const item = {
      hashKey: `#USER#${email}`,
      sortKey: `#NOTE#${uuid()}`,
      note
    }

    if (expirationTime) {
      item.expirationTime = expirationTime
    }

    const params = {
      TableName: this.tableName,
      Item: item
    };
    return await this.dynamoClient.put(params).promise()
  }

  async shareNote(sharingEmail, note, expirationTime) {
    const item = {
      hashKey: `#USER#${sharingEmail}`,
      sortKey: `#NOTE#${uuid()}`,
      note
    }

    if (expirationTime) {
      item.expirationTime = expirationTime
    }

    const params = {
      TableName,
      Item: item
    };
    return await this.dynamoClient.put(params).promise()
  }

  async queryNotes(email) {
    const params = {
      TableName,
      KeyConditionExpression: 'hashKey = :hkey',
      ExpressionAttributeValues: {
        ':hkey': `#USER#${email}`
      }
    }
    const result = await this.dynamoClient.query(params).promise()
    return result.Items
  }
}

module.exports = NoteStorage