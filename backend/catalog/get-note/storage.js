'use strict';

const AWS = require("aws-sdk");

class NoteStorage {
  constructor(tableName) {
    this.tableName = tableName;
    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
  }

  async getNote(email, noteId) {
    console.log(email, noteId)
    const params = {
      TableName: this.tableName,
      Key: {
        hashKey: email,
        sortKey: noteId
      }
    }
    return this.dynamoClient.get(params).promise();
  }
}

module.exports = NoteStorage