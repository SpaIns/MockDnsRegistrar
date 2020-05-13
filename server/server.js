/*
Steffan Achtmann

Goal of this project:

Create a software system that supports:
    Register a Domain
    Renew a Domain
    Get Info on a Domain
    Delete a Domain

Rules:
    * Anyone can register a domain name
    * Domain name must be >= 10 char
    * Verified contact id from ID verification provider must be provided
    * Support a finite list of ID verification providers
        * 15 providers currently
        * EX: provider-abc, provider-pqr, provider-xyz
        * Validate input contact id based on provider's given format
    * Skeleton design should support each provider having seperate validation
    * Should implement reasonable responses to each request

Design:
    * Focus on classes and method signatures that work
    * No persistent storage required
    * No presentation layer
    * Operations should be invoked via coded unit tests or test code
    * Ignore auth
    * Operators are B2B
        * Represented by CustomerID
            * This is different that contact-id
        * Financial charges are sent to CustomerID
    * Extensibility is more important than scaling or security
    * May add more req/response elements if desired
*/

// Server setup routines
const express = require('express')

const app = express()

app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API Running!'))

// Define route
app.use('/api/registrar', require('./routes/api/registrar'))

app.listen(5000, () => console.log('Server started on port 5000'))