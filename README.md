# Noter

### Description
Noter is simple application for sharing notes. I used React on frontend, and Node.js deployed on a few AWS Lambdas on backend.
In this project I used also other AWS services, like ApiGateway, Cognito, DynamoDB and Simple Email Service.

### Features
- Signup and sign in page managed by Cognito on backed
- notes creation
- sharing notes with other people (to view note account is required)
- define note expiration
- notification, when someone share note with you
(This feature will required proper SES configuration, cause by default SES is working on SANDBOX mode, which means you can send mails only to verified email addresses. [Link to documentation](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html))

### Deployment

To deploy backend to AWS you need to type following command in root dir:

```bash
make deploy
```

If you want to run frontend on localhost it will require some additional step.
You need to fill config.sample.js file with all required settings, and rename this file to config.js

To get required settings please run.

```bash
make describe
```

All required data from cloudformation stack should be displayed there. Then, when config file will be filled sipmply type

```bash
make run-frontend
```

If you wish to deploy frontend code to AWS, you need to create S3 bucket manually, with proper website hosting settings, and copy fronted build there.
Also it required proper setting for redirect rules, cause frontend is using client-side routing. I will automate it soon :)


### TODO
There are a couple things to improve:

- Cloudformation for frontend infrastrcture
- CI/CD based on Code Pipelines for whole project
- Unit tests
- e2e tests
- Frontend code cleanup