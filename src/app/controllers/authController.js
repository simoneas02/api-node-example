const express = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const authConfig = require('../../config/auth')
const User = require('../models/User')
const mailer = require('../../modules/mailer')

const router = express.Router()

const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, { expiresIn: 86400})

const findUser = (user, res) => {
  if(!user)
    return res.status(400).send({ error: `User not found!` })
}

router.post('/resgister', async (req, res) => {
  const { email } = req.body
  try {
    if( await User.findOne({ email }))
      return res.status(400).send({ error: `User with email: ${email} already exist` })

    const user = await User.create(req.body)
    user.password = undefined

    return res.send({
      user,
      token: generateToken({id: user.id}) 
    })

  } catch (error) {
    return res.status(400).send({ error: `Registration failed with error ${error}` })
  }
})

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')

  findUser(user, res)
    
  if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: `Invalid password` })
  
  user.password = undefined

  res.send({ 
    user, 
    token: generateToken({id: user.id}) 
  })
})

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })
    findUser(user, res)

    const token = crypto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token, 
        passwordResetExpires: now,
      }
    })

    mailer.sendMail({
      to: email,
      from: 'teste@gmail.com',
      template: '/forgot_password',
      context: {token}

    }, error => {
      if(error) {
        return res.status(400).send({ error: `Can't send forgot password email` })
      }

      return res.send()
    })

  } catch (error) {
      return res.status(400).send({ error: `Error on forgot password, try again, ${error}` })
  }
})

router.post('/reset_password', async (req, res) => {
  const { email, token, password } = req.body

  try {
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires')
    
    findUser(user, res)

    if(token !== user.passwordResetToken)
      return res.status(400).send({ error: `Invalid token` })

    const now = new Date()

    if(now > user.passwordResetExpires)
      return res.status(400).send({ error: `Token expired, generate a new one` })


    user.password = password

    await user.save()

    res.send()

  } catch (error) {
      console.log(error)
      return res.status(400).send({ error: `Can't reset password, try again, ${error}` })
    }
})

module.exports = app => app.use('/auth', router)