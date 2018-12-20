
// const stripe = require('stripe')(functions.config().keys.webhooks);
// const endpointSecret = functions.config().keys.signing;
const stripe = require("stripe")("sk_test_2VPEZSPoAZS3r3ubs35eeEGh")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();

// const stripe = require('stripe')(functions.config().stripe.token);

function charge(req, res) {
    const body = JSON.parse(req.body);
    // console.log(req.body,'===',body);
    const token = body.id;
    const amount = 200;
    const currency = "usd";

    // Charge card
    stripe.charges.create({
        amount,
        currency,
        description: 'Firebase Example',
        source: token,
    }).then(charge => {
        send(res, 200, {
            message: 'Success',
            charge,
        });
    }).catch(err => {
        console.log(err);
        send(res, 500, {
            error: err.message,
        });
    });
}

function send(res, code, body) {
    console.log(body,'body*****')
    res.send({
        statusCode: code,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(body),
    });
}

app.use(cors);
app.post('/', (req, res) => {
    // console.log(JSON.parse(req.body),'===');

    // Catch any unexpected errors to prevent crashing
    try {
        charge(req, res);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});

exports.stripePayment = functions.https.onRequest(app);