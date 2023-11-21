# URL Shorterner

## Description

A simple API Server built using Express, Typescript and PostgresSQL that exposes the following APIs:

1. **/url/shorten** - shortens a long url into a short one. User can also supply custom domain if random
   ending is not needed.
2. **/url/history** - returns all the urls shortened by the user.
3. **/url/:shortId** - redirects the users to the original url.

Each of the above mentioned routes are protected using **express-oauth2-jwt-bearer** framework
provided by **Auth0** and hence a valid token is needed for accessing any of the routes. This project
is simple yet elegant as all the SOLID principles were enforced including best practices like
IoC(Inversion of Control) and using interfaces as much as possible so that unit testing and
refactoring is a breeze.

## How to start the application

Before startig the application make sure to create a .env file that contains all following
environment variables:

`DATABASE_NAME=`
`DATABASE_PASSWORD=`
`DATABASE_USERNAME=`
`DATABASE_DIALECT=`
`DATABASE_HOST=`
`DATABASE_PORT=`
`DATABASE_POOL_MAX_CONNECTIONS=`
`DATABASE_POOL_ACQUIRE_TIME=`
`DATABASE_POOL_IDLE_TIME=`
`TOKEN_AUDIENCE=`
`TOKEN_ISSUER_BASE_URL=`
`TOKEN_SIGNING_ALG=`


Now install the dependencies using the following command:

`npm install`

To run the application locally the following command will compile the application and start the
server on port 8080 by default:

`npm start`

If you want to run the typescript code directly, it can be done using the following command which
uses **ts-node**:

`npm run dev`

If you want to use the application in production environment, the following command can be used to
start the application in cluster mode using **pm2** which will act as load balancer, providing high
availability and response time:

`npm run start-pm2`

To stop the started processes by **pm2**, the following command can be used:

`npm run stop-pm2`

The **processes.json** file present in the root directory can be modified according to the expected
application load.

## How to get authentication token from Auth0

As specified, this application uses **Auth0** as it's primary authentication and authorization
service. To access the APIs one needs to first create an account in [Auth0](https://auth0.com/) and
create the following:

1. An application needs to be added first:
    - If the client is a service or tool like Postman, then create a Machine to Machine application.
    - If the client is a mobile app, then a Native application.
    - If the client is a SPA, then a Single Page Web application.
    - If the client is a traditional web app, then a Regular Web application.

2. Create an API that has a unique identifier(this will the audience claim in the access token) defines the following permission:
    - read:urls
    - create:urls

3. Authorize the API created in step 2 for the application created in step 1 so that when you access the token endpoint, the required permissions are a part of the generated access token.

4. Use the access token in the endpoint and include it in every request that you make to the URL shortener application as follows `Bearer {token}`.





