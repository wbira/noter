'use strict';

const AWS = require("aws-sdk");

exports.sendMessage = (email, noteId, envVars) => {
  AWS.config.update({ region: "eu-west-1" });
  const params = createMessageParams(email, noteId, envVars)

  return new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise().catch(e => console.log(e))
}

function createMessageParams(email, noteId, { BASE_URL, SOURCE_MAIL }) {
  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <p>New shared <a href="${BASE_URL}/detail/${noteId}">note</a>,</p>
      </body>
    </html>
  `;

  const textBody = `
    Hi ${email},
    ...
  `;
  return {
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody
        },
        Text: {
          Charset: "UTF-8",
          Data: textBody
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "New shared note!"
      }
    },
    Source: `Noter <${SOURCE_MAIL}>`
  };
}