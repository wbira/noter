'use strict';

const { sendMessage } = require('./sender')

exports.lambdaHandler = async function (event) {
  const envVars = process.env
  return handleStreamData(event, sendMessage, envVars)
};

