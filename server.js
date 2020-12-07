const express = require('express');
const sequelize = require('./config/connection');

const app = exprees();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));