'use strict';

const AWS = require("aws-sdk");

exports.handleStreamData = async function (event, sendMessage, envVars) {
  const sharedNotes = extractSharedNotes(event)
  for (let i = 0; i < sharedNotes.length; i++) {
    const { hashKey, sortKey } = sharedNotes[i]
    await sendMessage(hashKey, sortKey, envVars)
  }
}

function extractSharedNotes(event) {
  return event.Records.map(
    (record) => AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
  ).filter(note => note.shared)
}

