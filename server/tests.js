/*
Steffan Achtmann

This test file uses Axios to send request to our server, and
has hardcoded test conditions.  To be honest, I'm not familiar
with test frameworks and am just trying to use what I know to
meet the project requirements without spending the project time
estimation on learning a test framework alone.

Please run the server before calling this file.
You can run the server using the command "npm run server"
*/
const axios = require('axios')

/*
Test function for testing valid and invalid POST requests
*/
const postTest = () => {
    console.log('Testing Post Requests')
}

const validPost = () => {
    console.log('This POST request should return valid')
}

const invalidRequestPost = () => {
    console.log('This POST request should return invalid 1')
}

const missingBodyComponentsPost = () => {
    console.log('This POST request should return invalid 2')
}

const failedValidationPost = () => {
    console.log('This POST request should return invalid 3')
}

/*
Test function for testing valid and invalid PUT requests
*/
const putTest = () => {
    console.log('Testing Put Requests')
}
const validPut = () => {

}

// Tests an invalid PUT due to domain not being found
const invalidRequestPut = () => {

}

// Tests an invalid PUT due to bad data in the body of the request
const missingBodyComponentsPut = () => {

}

/*
Test function for testing valid and invalid GET requests
*/
const getTest = () => {

}

const validGet = () => {

}

const invalidRequestGet = () => {

}

const missingBodyComponentsGet = () => {

}

/*
Test function for testing valid and invalid DELETE requests
*/
const deleteTest = () => {

}

const validDelete = () => {

}

const invalidRequestDelete = () => {

}

const missingBodyComponentsDelete = () => {

}

postTest()
putTest()
getTest()
deleteTest()