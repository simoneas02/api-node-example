const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.post('/resgister', async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.send({user})

  } catch (error) {
    return res.status(400).send({ error: `Registration failed with error ${error}` })
  }
})

module.exports = app => app.use('/auth', router)