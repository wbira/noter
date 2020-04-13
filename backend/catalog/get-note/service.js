'use strict';

const { createResponse } = require('./apigateway')


exports.handleGetNote = async (event, storage) => {
  const { email } = event.requestContext.authorizer.claims;
  const { noteId } = event.pathParameters;

  let result;
  try {
    result = await storage.getNote(email, noteId);
  } catch (err) {
    console.log(err);
    return createResponse("Internal Server Error", 500);
  }
  return result.Item && result.Item.note ? convertExpirationTime(result.Item) : createResponse("Not found", 404)
}

function convertExpirationTime(item) {
  if (item.expirationTime) {
    const newItem = {
      ...item,
      expirationTime: epochToDate(item.expirationTime)
    }

    return createResponse(JSON.stringify(newItem), 200)
  }
  return createResponse(JSON.stringify(item), 200)
}


function epochToDate(epoch) {
  return new Date(epoch * 1000)
}

function format(date) {

}