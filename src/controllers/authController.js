const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.post('/resgister', async (req, res) => {
  const { email } = req.body
  try {
    if( await User.findOne({ email }))
      return res.status(400).send({ error: `User with email: ${email} already exist` })

    const user = await User.create(req.body)
    user.passwrd = undefined

    return res.send({user})

  } catch (error) {
    return res.status(400).send({ error: `Registration failed with error ${error}` })
  }
})

module.exports = app => app.use('/auth', router)