'use strict';

const { sendMessage } = require('./sender')
const { handleStreamData } = require('./service')

exports.lambdaHandler = async function (event) {
  const envVars = process.env
  return handleStreamData(event, sendMessage, envVars)
};

