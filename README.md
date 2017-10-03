# iComrate

A web application to share and book avaiable resources 

Technologies
 * [NodeJS](https://nodejs.org/en/): JavaScript runtime environment
 * [ExpressJS](https://expressjs.com/): Node.js web framework
 * [React](https://reactjs.org/): A JavaScript library for building user interfaces
 * [MongoDB](https://www.mongodb.com/): NoSQL, document database
 * [AWS](https://aws.amazon.com/): EB, EC2, ECR, S3
 * [Travis](https://travis-ci.com/): CI-testing
 * [Docker](https://www.docker.com/): Software container platform
 * [Redis](https://redis.io/): In-memory data structure store, used as a database

### Deployment process

 * Push request to Github
 * Travis runs test cases
 * Travis builds docker image
 * Travis uses AWS IMA credentials to deploy docker image to Elastic Beanstalk environment.

### Usage

Install library:

```node module
npm install
```
```yarn
npm install -g yarn
```
Then run for windows
```javascript
copy .env.example .env
```
Or for Linux/Mac
```javascript
cp .env.example .env
```

Run Express server on port 8000:

```javascript
yarn start
```
Run test:

```javascript
yarn test
```
