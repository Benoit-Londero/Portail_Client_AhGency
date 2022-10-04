// backend/index.js

const express = require("express");
const {con} = require('./db');
const path = require('path');
const cors = require('cors');

const app = express();

const router = require("./config/router.js");

app.use(cors());
app.use(express.json());
/* app.use(express.static(path.join(__dirname, 'public'))); */

app.use("/", router);

module.exports = app;



