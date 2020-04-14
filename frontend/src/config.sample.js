export default {
  apiGateway: {
    REGION: 'YOUR_AWS_REGION',
    URL: 'YOUR_API_GATEWAY_URL'
  },
  cognito: {
    REGION: 'YOUR_AWS_REGION',
    USER_POOL_ID: 'YOUR_USER_POOL_ID',
    APP_CLIENT_ID: 'YOUR_COGNITO_APP_CLIENT_ID',
    DOMAIN: 'YOUR_COGNITO_DOMAIN',
    SCOPE: ['email', 'openid'],
    REDIRECT_SIGN_IN: 'http://localhost:3000/',
    REDIRECT_SIGN_OUT: 'http://localhost:3000/',
    RESPONSE_TYPE: 'code'
  }
};


