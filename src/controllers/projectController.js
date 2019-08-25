const express = require('express')

const authMiddleware = require('../middleares/auth')  

const router = express.Router()

router.use(authMiddleware)

router.get('/', (req, res) => {
  res.send({ 
    OK: true,
    user: req.userId
  })
})

module.exports = app => app.use('/projects', router)