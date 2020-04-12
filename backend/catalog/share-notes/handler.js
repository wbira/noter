'use strict';

const { handleShareNote } = require('./service')
const NoteStorage = require('./storage')
const storage = new NoteStorage(process.env.TABLE_NAME)

exports.lambdaHandler = async (event) => {
  console.log("Event:", event)
  console.log("Claims:", event.requestContext.authorizer.claims)
  return handleShareNote(event, storage)
};
