'use strict';

const { createResponse } = require('./apigateway')


exports.handleFetchNotes = async (event, storage) => {
  const { email } = event.requestContext.authorizer.claims;

  let result;
  try {
    result = await storage.queryNotes(email);
  } catch (err) {
    console.log(err);
    return createResponse("Internal Server Error", 500);
  }

  console.log("More items", result)
  let response
  if (result.Items) {
    response = createResponse(JSON.stringify({
      notes: result.Items,
    }), 200);
  } else {
    console.log("Not found items", result)
    response = createResponse("Not Found", 404);
  }

  return response;
}