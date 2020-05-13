/*
Steffan Achtmann

This file handles the API endpoints for the DNS Registrar system

Supported API calls are:
    Register a Domain
    Renew a Domain
    Get Info on a Domain
    Delete a Domain

*/

const express = require('express')
const {check, validationResult} = require('express-validator')

const router = express.Router()

// Our 'database' for test purposes
const domains = []

// Sample list of valid providers
// Assumption made that while a real provider list will have 15 providers,
// this mockup server can get by with 3 for demo purposes
const providers = [
    'providerabc',
    'providerpqr',
    'providerxyz'
]

// Our list of providers' validators. In real code, this could be functions
const providerValidations = {
        providerabc : (domain) => { return false},
        providerpqr : (domain) => { return true},
        providerxyz : (domain) => { return true},
}

// Our list of valid domain registration renewal periods
const validPeriods = [
    'year',
    'month',
    'day'
]

// Non-Routing Functions

// Given a registration period and value,
// return the expiration date
const getExpireDate = (reg) => {
    // Deconstruct our registration period
    const {
        value,
        period
    } = reg

    if (period.localeCompare('year') == 0) {
        return addYears(new Date(), value)
    }
    else if (period.localeCompare('month') == 0) {
        return addMonths(new Date(), value)
    }
    else if (period.localeCompare('days') == 0) {
        return addDays(new Date(), value)
    }
    else {
        // This should never be hit since we validate the period before
        // calling this function
        return new Date()
    }
}

// Helper functions to add time to current date
// Shamelessly copied from 
// https://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
const addDays = (curDate, days) => {
    curDate.setDate(curDate.getDate() + days);
    return curDate;
}

const addMonths = (curDate, months) => {
    curDate.setMonth(curDate.getMonth() + months)
    const newDate = new Date()

    if (newDate !== curDate) {
        return addDays(curDate, -curDate)
    }

    return curDate
}

const addYears = (curDate, years) => {
    curDate.setFullYear(curDate.getFullYear() + years)

    const newDate = new Date()

    if (newDate !== curDate) {
        return addDays(curDate, -curDate)
    }
    return curDate
}


// Routing Functions

// @route  POST api/registrar
// @desc   Register a Domain
/*
    * Anyone can register a domain name
    * Domain name must be >= 10 char
    * Verified contact id from ID verification provider must be provided
    * Support a finite list of ID verification providers
        * 15 providers currently
        * EX: provider-abc, provider-pqr, provider-xyz
        * Validate input contact id based on provider's given format
    * Skeleton design should support each provider having seperate validation

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

Assumptions Made:
    We will always recieve a unique domain name that isn't currently
    registered.
*/
router.post('/', [
    check('name').isLength({ min: 10}),
    check('provider').not().isEmpty(),
    check('reg').not().isEmpty(),
    check('customerId').not().isEmpty()
], async (req, res) => {
    try {
        // Deconstruct our request body
        const {
            name,
            provider,
            reg,
            customerId,
        } = req.body

        // At this stage, name has been verified to be >= 10 chars
        // We still need to verify the provider
        validProvider = providers.includes(provider)
        if (!validProvider) {
            // Provider is not in our list of valid providers. Return error
            return res.status(400).json({errors: [{msg: 'Invalid provider.'}]})
        }
        // If we have a valid provider, we must validate against the provider
        if (!(providerValidations.provider)(name)) {
            // Provider failed to validate our domain
            return res.status(406).json({errors: [{msg: 'Provider failed to validate.'}]})
        }
        // If we have a valid provider, we need to check that our reg period
        // provided is also valid

        // Deconstruct the registration period
        const {
            value,
            period,
        } = reg
        // Check that we have a period, reasonable value, and that the period is one we recognize
        if (!period || !value || value <= 0 || !validPeriods.includes(period)) {
            return res.status(400).json({errors: [{msg: 'Invalid registration period provided.'}]})
        }

        // If everything is valid at this point, we can add it to our 'database'
        const registeredDomain = {
            name: name,
            expireDate: getExpireDate(reg),
            customer: customerId,
        }

        domains.push(registeredDomain)

        const responseObject = {
            name: name,
            expireDate: registeredDomain.expireDate,
        }

        // Return the valid domain results minus the customer id
        return res.json(responseObject)
    }
    catch (error) {
        console.error('Issue with Posting a new domain')
        return res.status(500).send('Server Error')
    }
})



// @route  PUT api/registrar/
// @desc   Renew a Domain
/*
Renewing a Domain Name
    Request:
        * Domain Name
        * Registration Period
            * Value (int)
            * Period (year, mo, day)
    Response:
        * Domain Name
        * Domain Expiration Date

Assumptions Made:
    Domains are unique
    Renewals use the period starting from today
    We can renew to a time that's earlier than the original
        expiration date.
*/
router.put('/', [
    check('name').isLength({ min: 10}),
    check('reg').not().isEmpty(),
],
async (req, res) => {
    try {
        // Try to find the record in our 'database'
        const index = domains.findIndex((element) => 
            (element.name.localeCompare(req.name) == 0)
        )
        // Check if we found it
        if (index === -1) {
            // Couldn't find the record
            return res.status(404).json({errors: [{msg: 'Domain not found.'}]})
        }
        // We found it, now let's validate the registration period

        // Deconstruct the registration period
        const {
            value,
            period,
        } = reg
        // Check that we have a period, reasonable value, and that the period is one we recognize
        if (!period || !value || value <= 0 || !validPeriods.includes(period)) {
            return res.status(400).json({errors: [{msg: 'Invalid registration period provided.'}]})
        }

        // We can simply update the registration period now
        domains[index].expireDate = getExpireDate(reg)

        // Return the required response
        const responseObject = {
            name: domains[index].name,
            expireDate: domains[index].expireDate,
        }

        return res.json(responseObject)
    }
    catch (error) {
        console.error('Issue with Renewing an existing domain')
        return res.status(500).send('Server Error')
    }
})

// @route  GET api/registrar/
// @desc   Get information on a Domain
/*
Getting Info on a Domain Name
    Request:
        * Domain Name
    Response:
        * Domain Name
        * Domain Expiration Date

Assumptions Made:
    Domains are unique
*/
router.get('/',[
    check('name').isLength({min: 10}),
],
async (req, res) => {
    try {
        // Try to find the record in our 'database'
        const index = domains.findIndex((element) => 
            (element.name.localeCompare(req.name) == 0)
        )
        // Check if we found it
        if (index === -1) {
            // Couldn't find the record
            return res.status(404).json({errors: [{msg: 'Domain not found.'}]})
        }
        // We found it, return the required information
        // Deconstruct the object at the found index
        const {
            name,
            expireDate,
            customer
        } = domains[index]

        // Create our response object
        const responseObject = {
            name: name,
            expireDate: expireDate,
        }

        return res.json(responseObject)
    }
    catch (error) {
        console.error('Issue with Getting domain information.')
        return res.status(500).send('Server Error')
    }
})


// @route  DELETE api/registrar/
// @desc   Delete an existing Domain
/*
Deleting a Domain Name
    Request:
        * Domain Name
    Response:
        * N/A (only response code)

Assumptions Made;
    Domains are unique
*/
router.delete('/',[
    check('name').isLength({min: 10}),
],
async (req, res) => {
    try {
        // Try to find the record in our 'database'
        const index = domains.findIndex((element) => 
            (element.name.localeCompare(req.name) == 0)
        )
        // Check if we found it
        if (index === -1) {
            // Couldn't find the record
            return res.status(404).json({errors: [{msg: 'Domain not found.'}]})
        }
        // We found it, remove it from our 'database'
        domains.splice(index, 1)
        return res.status(204).send('Domain deleted.')
    }
    catch (error) {
        console.error('Issue with Deleting an existing domain')
        return res.status(500).send('Server Error')
    }
})

module.exports = router