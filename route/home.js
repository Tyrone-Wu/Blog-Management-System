const express = require('express')

const home = express.Router();

home.get('/', (req, res) => {
  res.send('welcome to home page')
})

module.exports = home;