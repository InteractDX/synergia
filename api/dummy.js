/*******************************************************
* Copyright 2018 Aurionpro Solutions Limited
*
* This file is part of Aurionpro Designer tool.
* It can not be copied and/or distributed without the express
* permission of Aurionpro Solutions Limited.
*
* Author: Kuldeep.Bhatt, Zymr
*******************************************************/

var express = require("express");
var app = express();
var server = require("http").createServer(app);
server.listen("8080", "localhost", function () {
    console.log("Express server listening on 8080");

    var router = express.Router();
    router.post('/login', function(req, res) {
        return res.status(200).send({});
    });
    router.get("/data", function(req, res) {
        return res.status(200).send({
            "ACCOUNT_SUMMARY": [{
                "ACCOUNT": "Savings",
                "CURRENCY": "GBP",
                "AMOUNT": 1771.42,
                "TYPE": "Last Transaction",
                "COLOR": "#3366CC"
            }, {
                "ACCOUNT": "Wealth",
                "CURRENCY": "GBP",
                "AMOUNT": 7830.00,
                "TYPE": "Last Transaction",
                "COLOR": "#d62728"
            }, {
                "ACCOUNT": "Term",
                "CURRENCY": "GBP",
                "AMOUNT": 22730.11,
                "COLOR": "#ff7f0e",
                "TYPE": "Balance"
            }, {
                "ACCOUNT": "Term Deposit",
                "CURRENCY": "GBP",
                "AMOUNT": 103000.00,
                "COLOR": "#2ca02c",
                "TYPE": "Balance"
            }, {
                "ACCOUNT": "Wealth",
                "CURRENCY": "GBP",
                "AMOUNT": 10000.00,
                "TYPE": "Balance",
                "COLOR": "#d62728"
            }, {
                "ACCOUNT": "Savings",
                "CURRENCY": "DOLLOR",
                "AMOUNT": 98.00,
                "TYPE": "Last Transaction",
                "COLOR": "#3366CC"
            }],
            "CUSTOMER_NAME": "Laura J Donald",
            "ADDRESS1": "4000 Executive Parkway,",
            "ADDRESS2": "Saint Globin Rd # 250",
            "ADDRESS3": "Canary Wharf, E94583",
            "STATEMENT_DATE": "1-APR-16",
            "FROM_DATE": "Annual Statement",
            "TO_DATE": "31 Oct 2014",
            "ACC_NO": "371860120",
            "CUSTOMER_ID": "37112666",
            "UNIQUE_ID": "David Miller",
            "BRANCH_ID": "ULLS00012",
            "RMCONTACT": "+44167000045",
            "RMNAME": "+44167000045",
            "BRANCH_ADDRESS1": "Saint College Rd,",
            "BRANCH_ADDRESS2": "PO BOX 345,",
            "BRANCH_ADDRESS3": "DUBLIN",
            "LAT":25.363,
            "LONG":72.044,
            "USERNAME":"test",
            "PASSWORD":"test"
        });
    });
    // CORS handling //
    app.all('/*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Accept, accept, Authorization, authorization, Content-Type');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Max-Age', 24 * 60 * 60); // in seconds
        next();
    });
    // First OPTIONS request will get all the methods in response with expiry time
    app.options('*', function(req, res){
        res.status(200).end();
    });
    app.use("/", router)
});
exports = module.exports = app;