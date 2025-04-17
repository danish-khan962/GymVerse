const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv")
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

dotenv.config()
app.use(bodyParser.json())
app.use(cors())

// Initialize Clerk with your API key
ClerkExpressWithAuth({
    apiKey: 'sk_test_tpeVMob3gQ7Y1j1AgDdv8M0fZFBw2z73uVTscD42H6',
  });

module.exports = app;