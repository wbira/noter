'use strict';

const { validExpirationDays, convertDaysToEpoch } = require('./date')
const { createResponse } = require('./apigateway')



exports.handleCreateNote = async (event, storage) => {
  const { email } = event.requestContext.authorizer.claims
  const { note, expirationDays } = JSON.parse(event.body);


  let expirationTime
  if (validExpirationDays(expirationDays)) {
    expirationTime = convertDaysToEpoch(expirationDays)
  }

  let response
  try {
    const item = await storage.persistNote(email, note, expirationTime)
    console.log("Item", item)
    response = createResponse(JSON.stringify(item), 201)
  } catch (err) {
    console.error(err)
    return createResponse("Internal Server Error", 500)
  }

  return response
}