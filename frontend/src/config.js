export default {
	apiGateway: {
		REGION: 'eu-west-1',
		URL: ' https://nx6jc1jae7.execute-api.eu-west-1.amazonaws.com/Stage'
	},
	cognito: {
		REGION: 'eu-west-1',
		USER_POOL_ID: 'eu-west-1_W12DUOAuR',
		APP_CLIENT_ID: '3br50ulr5h6e2krd2ik7usftdn',
		DOMAIN: 'nx6jc1jae7.auth.eu-west-1.amazoncognito.com',
		SCOPE: ['email', 'openid'],
		REDIRECT_SIGN_IN: 'http://localhost:3000/',
		REDIRECT_SIGN_OUT: 'http://localhost:3000/',
		RESPONSE_TYPE: 'code'
	}
};
