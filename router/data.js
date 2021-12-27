"use strict";
const { Router } = require("express");
const express = require("express");
const { route } = require("express/lib/application");
const noderfc = require("node-rfc");
let router = express.Router();

router.use(function(req, res, next){
    console.log(req.url, "@", Date.now());
    next()
})


.route("/get")
.get((req, res) => {
    res.send("hi get  /api/data")
//    console.log( BAPI_VENDOR_GETDETAIL())
})

router.post('/post',async(req, res) => {
    res.send("hi post  /api/data")

})

router
.route("/data/:id")
.put( (req, res) => {
    res.send("hi put /api/data" + req.params.dataid)
})
.get((req, res) => {
    res.send("hi get /api/data" + req.params.dataid)

})

module.exports = router;