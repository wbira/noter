export default {
	apiGateway: {
		REGION: 'eu-west-1',
		URL: ' https://1kjfnvcmk9.execute-api.eu-west-1.amazonaws.com/Stage'
	},
	cognito: {
		REGION: 'eu-west-1',
		USER_POOL_ID: 'eu-west-1_7vxfbaBFj',
		APP_CLIENT_ID: '5d7ujfto6v69c5lu09h03erbmc',
		DOMAIN: '1kjfnvcmk9.auth.eu-west-1.amazoncognito.com',
		SCOPE: ['email', 'openid'],
		REDIRECT_SIGN_IN: 'http://localhost:3000/',
		REDIRECT_SIGN_OUT: 'http://localhost:3000/',
		RESPONSE_TYPE: 'code'
	}
};
