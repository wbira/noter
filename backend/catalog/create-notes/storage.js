
const AWS = require("aws-sdk");
const uuid = require("uuid");

class NoteStorage {
  constructor(tableName) {
    this.tableName = tableName
    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
  }

  async persistNote(email, note, expirationTime) {
    const item = {
      hashKey: email,
      sortKey: uuid(),
      note,
      shared: false
    }

    if (expirationTime) {
      item.expirationTime = expirationTime
    }

    const params = {
      TableName: this.tableName,
      Item: item
    };
    await this.dynamoClient.put(params).promise()
    return item
  }
}

module.exports = NoteStorage