"use strict"
const express = require('express');
const bodyParser = require('body-parser')
const config = require('./src/config');
const mqtt = require('./src/mqtt');
const Router = require('./src/router');

const {HTTP} = config;

class PickFast {

    constructor(){
        this.app = new express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.router = new Router(this.app);
        this.router.setupRoutes();
    }

    run(){
        this.app.listen(HTTP.PORT,()=>{
            console.log(`Server is running on port ${HTTP.PORT}`);
        });
    }
}

const pickfast = new PickFast();
pickfast.run();