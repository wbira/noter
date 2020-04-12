'use strict';

const { validExpirationDays, convertDaysToEpoch } = require('../../utils')
const { createResponse } = require('../../aws/apigateway')

exports.handleCreateNote = async (event, storage) => {
  const { email } = event.requestContext.authorizer.claims
  const { note, expirationDays } = JSON.parse(event.body);


  let expirationTime
  if (validExpirationDays(expirationDays)) {
    expirationTime = convertDaysToEpoch(expirationDays)
  }

  let response
  try {
    storage.persistNote(email, note, expirationTime)
    response = createResponse(JSON.stringify(item), 201)
  } catch (err) {
    console.error(err)
    return createResponse("Internal Server Error", 500)
  }

  return response
}

exports.handleFetchNote = async (event, storage) => {
  const { email } = event.requestContext.authorizer.claims

  let result
  try {
    const result = storage.queryNotes(email)
    console.log("Result", result) // todo filter

  } catch (err) {
    console.log(err);
    return err;
  }


  let response
  if (result.Items) {
    // todo filter items by expirationTime
    response = createResponse(JSON.stringify({
      notes: result.Items,
    }), 200)
  } else {
    response = createResponse("Not Found", 404)
  }

  return response
}

exports.handleShareNote = async (event, storage) => {
  const { email, note } = JSON.parse(event.body);

  let response
  try {
    storage.shareNote(email, note)
    response = createResponse(JSON.stringify(item), 201)
  } catch (err) {
    return createResponse("Internal Server Error", 500)
  }
}