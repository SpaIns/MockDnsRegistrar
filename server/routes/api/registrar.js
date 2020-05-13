/*
Steffan Achtmann

This file handles the API endpoints for the DNS Registrar system

Supported API calls are:
    Register a Domain
    Renew a Domain
    Get Info on a Domain
    Delete a Domain

    Registering a Domain Name
        Request:
            * Domain Name
            * Registration period
                * Value (int)
                * Period (year, mo, day)
            * Verified Contact
                * verification provider
                * Contact ID
        Response:
            * Domain Name
            * Domain Expiration Date
    Renewing a Domain Name
        Request:
            * Domain Name
            * Registration Period
                * Value (int)
                * Period (year, mo, day)
        Response:
            * Domain Name
            * Domain Expiration Date
    Getting Info on a Domain Name
        Request:
            * Domain Name
        Response:
            * Domain Name
            * Domain Expiration Date
    Deleting a Domain Name
        Request:
            * Domain Name
        Response:
            * N/A (only response code)
*/

const express = require('express')
const {check, validationResult} = require('express-validator')

const router = express.Router()

// Our database for test purposes
const domains = []

// @route  POST api/registrar
// @desc   Register a Domain
router.post('/',async (req, res) => {
    try {

    }
    catch (error) {
        console.error('Issue with Posting a new domain')
        return res.status(500).send('Server Error')
    }
})


// @route  PUT api/registrar/:id
// @desc   Renew a Domain
router.post('/',async (req, res) => {
    try {

    }
    catch (error) {
        console.error('Issue with Renewing an existing domain')
        return res.status(500).send('Server Error')
    }
})

// @route  GET api/registrar/:id
// @desc   Get information on a Domain
router.post('/',async (req, res) => {
    try {

    }
    catch (error) {
        console.error('Issue with Getting domain information.')
        return res.status(500).send('Server Error')
    }
})


// @route  DELETE api/registrar/:id
// @desc   Delete an existing Domain
router.post('/',async (req, res) => {
    try {

    }
    catch (error) {
        console.error('Issue with Deleting an existing domain')
        return res.status(500).send('Server Error')
    }
})

module.exports = router