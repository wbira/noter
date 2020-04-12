'use strict'

const { createResponse } = require('./apigateway')

exports.handleShareNote = async (event, storage) => {
  const { email, note, expirationTime } = JSON.parse(event.body);

  let response
  try {
    const item = await storage.shareNote(email, note, expirationTime)
    response = createResponse(JSON.stringify(item), 201)
  } catch (err) {
    return createResponse("Internal Server Error", 500)
  }
  return response
}