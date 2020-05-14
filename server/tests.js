/*
Steffan Achtmann

This test file uses Axios to send request to our server, and
has hardcoded test conditions.  To be honest, I'm not familiar
with test frameworks and am just trying to use what I know to
meet the project requirements without spending the project time
estimation on learning a test framework alone.

Due to this, and the async nature of axios, the call responses
will be after every call has been executed.  I tried to work around
this, but to be completely frank, JS and concurrency aren't things
I work with often, so I wasn't able to get it to act as I wanted.
Sometimes the tests function as intended, other times the concurrent
nature of the calls means that we may try to call delete, put, or get
requests before the initial object has been posted to the 'database'.

Please run the server before calling this file.
You can run the server using the command "npm run server" or
"npm run start"
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
const postTests = async () => {
    console.log('Testing Post Requests')
    await shouldAllowValidPost()
    await invalidRequestPost()
    await missingBodyComponentsPost()
}

const shouldAllowValidPost = async () => {
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
const invalidRequestPost = async () => {
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
const missingBodyComponentsPost = async () => {
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
const putTests = async () => {
    console.log('Testing Put Requests')
    await validPut()
}
const validPut = async () => {
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
const getTests = async () => {
    console.log('Testing Get Requests')
    await validGet()
}

const validGet = async () => {
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
const deleteTests = async () => {
    console.log('Testing Delete Requests')
    await validDelete()
}

const validDelete = async () => {
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


// For running all our tests - it was meant to run the async axios
// functions in a way that the order of the tests was kept, but
// it didn't quite work out.  If whoever reviews this wants to
// let me know how this actually could work (whether you move on with
// me as a candidate or not), I'd appreciate it!
const main = async () => {
    try {
        const tests = [
            postTests,
            putTests,
            getTests,
            deleteTests,
        ]

        tests.map(async test => {
            return await test()
        })
    }
    catch (error) {
        console.log('An unexpected error occured during tests.')
    }
}

main()