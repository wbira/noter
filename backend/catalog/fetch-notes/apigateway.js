'use strict';

exports.createResponse = (body, statusCode) => {
  return {
    body,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode
  }
}