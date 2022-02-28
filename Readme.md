## API response to URl list

# Description:
This is an example API that performs a GET request and retrieves a list of URLs avaiable in the response.

# About:
- Author : Marcelo Fernandes Ferreira
- Language : nodejs with Typescript
- Testing : Jest
- Task Description: https://github.com/riskledger/backend-code-exercise

# How to 
- 1. Before starting: On a terminal at the root folder of the project 
```
yarn install
or
npm install
```
- 2. To test
```
yarn test
or 
npm run test
```
- 3. To Run
```
yarn start
or 
npm run start
```
Use a API testing App (e.g. Postman) and target GET > https://localhost:3000?Url='URL TO BE TARGETTED'

# Future Improvements

- Adding behaviour testing - Due to time constraints only TDD has been applied to the project, using CucumberJs i would add some behaviour testing

- Performance improvements - As a phase 2 for this project I would make the project more performant.
    - Removing the Regex for a more defined approach - as an Assumption I use HTML, XML and JSON responses, so I could have a method for each response type and restrict the filter to each individual element
    - A Reducer could be used , since the response comes back as a single Stringified JSON value this could reduce the overhead

- Improving security 
    - Would had some conditions to the parameter to make sure no  scripts could be passed  in as part of the URL, therefore removing any XSS vulnerability that may arise
    - Adding some API caching to reduce the number of hits and avoid DDOS

