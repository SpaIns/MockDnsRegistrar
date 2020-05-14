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

const url = 'http://localhost:5000/api/registrar'

/*
Test function for testing valid and invalid POST requests

A different way of implementing this could be to pass
different bodies into one single function that handles
posts, since the core structure of every request is quite
similar.  We could compare the result against what we
expect to get back.

However, that couples all the tests together very strongly.
In this demo, it's not a big deal, but if we were to expand this
out, said structure would likely not last as long.
*/
const postTests = () => {
    console.log('Testing Post Requests')
    shouldAllowValidPost()
    invalidRequestPost()
    missingBodyComponentsPost()
}

const shouldAllowValidPost = () => {
    console.log('This POST request should return valid')
    const body = {
        name: 'somenamevalue',
        provider: 'providerxyz',
        reg: {
            value: '1',
            period: 'day',
        },
        customerId: 1,
    }
    axios.post(url, body).then(response => {
        const results = {
            name: response.data.name,
            expireDate: response.data.expireDate
        }

        // Check that the results actually exist
        if (!results.name || !results.expireDate) {
            console.log('POST request not valid due to missing response data.')
            return
        }

        if (results.name.localeCompare(body.name) !== 0) {
            console.log('PUT request not valid due to altered name.')
            return
        }

        if (response.status === 200) {
            console.log('POST request valid!')
            return
        }
        else {
            console.log('POST request not valid due to bad response code.')
        }
    }).catch(error => {
        console.log('POST request not valid due to error: ' + error)
    })
}

// NOTE: The below 3 tests are ones I would also include
// for the GET, PUT, and DELETE functions, but it seems
// the implementation is going to be identical to the POST
// validation checks, and it doesn't seem worthwhile
// for this particular demo project (it just adds more code to look at!)

// The request itself will return invalid. The root cause is the provider
// In a more stringent test framework, we could have tests like this for
// every part of the body that is validated in some form
const invalidRequestPost = () => {
    console.log('This POST request should return invalid')
    const body = {
        name: 'somenamevalue',
        provider: 'invalidprovider',
        reg: {
            value: '1',
            period: 'day',
        },
        customerId: 1,
    }
    axios.post(url, body).then(response => {
        const results = {
            name: response.data.name,
            expireDate: response.data.expireDate
        }

        // Check that the results actually exist
        if (!results.name || !results.expireDate) {
            console.log('POST request not valid due to missing response data.')
            return
        }

        if (results.name.localeCompare(body.name) !== 0) {
            console.log('PUT request not valid due to altered name.')
            return
        }

        if (response.status === 200) {
            console.log('POST request valid!')
            return
        }
        else {
            console.log('POST request not valid due to bad response code.')
        }
    }).catch(error => {
        console.log('POST request not valid due to error: ' + error)
    })
}

// This request will also return invalid. The root cause is the body is missing
// a required object (provider here).
const missingBodyComponentsPost = () => {
    console.log('This POST request should return invalid 2')
    const body = {
        name: 'somenamevalue',
        reg: {
            value: '1',
            period: 'day',
        },
        customerId: 1,
    }
    axios.post(url, body).then(response => {
        const results = {
            name: response.data.name,
            expireDate: response.data.expireDate
        }

        // Check that the results actually exist
        if (!results.name || !results.expireDate) {
            console.log('POST request not valid due to missing response data.')
            return
        }

        if (results.name.localeCompare(body.name) !== 0) {
            console.log('POST request not valid due to altered name.')
            return
        }

        if (response.status === 200) {
            console.log('POST request valid!')
            return
        }
        else {
            console.log('POST request not valid due to bad response code.')
        }
    }).catch(error => {
        console.log('POST request not valid due to error: ' + error)
    })
}

/*
Test function for testing valid and invalid PUT requests
*/
const putTests = () => {
    console.log('Testing Put Requests')
    validPut()
}
const validPut = () => {
    console.log('This PUT request should return valid.')
    const body = {
        name: 'somenamevalue',
        reg: {
            value: '1',
            period: 'month',
        },
    }
    axios.put(url, body).then(response => {
        const results = {
            name: response.data.name,
            expireDate: response.data.expireDate
        }

        // Check that the results actually exist
        if (!results.name || !results.expireDate) {
            console.log('PUT request not valid due to missing response data.')
            return
        }

        if (results.name.localeCompare(body.name) !== 0) {
            console.log('PUT request not valid due to altered name.')
            return
        }

        if (response.status === 200) {
            console.log('PUT request valid!')
            return
        }
        else {
            console.log('PUT request not valid due to bad response code.')
        }
    }).catch(error => {
        console.log('PUT request not valid due to error: ' + error)
    })
}

/*
Test function for testing valid and invalid GET requests
*/
const getTests = () => {
    console.log('Testing Get Requests')
    validGet()
}

const validGet = () => {
    console.log('This GET request should return valid.')
    
    const body = {
        name: 'somenamevalue',
    }

    axios.get(url, body).then(response => {
        const results = {
            name: response.data.name,
            expireDate: response.data.expireDate
        }

        // Check that the results actually exist
        if (!results.name || !results.expireDate) {
            console.log('GET request not valid due to missing response data.')
            return
        }

        if (results.name.localeCompare(body.name) !== 0) {
            console.log('GET request not valid due to altered name.')
            return
        }

        if (response.status === 200) {
            console.log('GET request valid!')
            return
        }
        else {
            console.log('GET request not valid due to bad response code.')
        }
    }).catch(error => {
        console.log('GET request not valid due to error: ' + error)
    })
}

/*
Test function for testing valid and invalid DELETE requests
*/
const deleteTests = () => {
    console.log('Testing Delete Requests')
    validDelete()
}

const validDelete = () => {
    console.log('This DELETE request should return valid.')
    const body = {
        name: 'somenamevalue',
    }

    axios.delete(url, body).then(response => {
        if (response.status === 204) {
            console.log('DELETE request valid!')
            return
        }
        else {
            console.log('DELETE request not valid due to bad response code.')
        }
    }).catch(error => {
        console.log('DELETE request not valid due to error: ' + error)
    })
}


postTests()
putTests()
getTests()
deleteTests()