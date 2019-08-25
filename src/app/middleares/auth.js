const jwt = require('jsonwebtoken')

const authConfig = require('../../config/auth.json')  

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader)
    return res.status(401).send({ error: `No token provided` })

  const parts = authHeader.split(' ')
  const isParts = parts.length === 2;
  
  if(!isParts) {
    return res.status(401).send({ error: `Token error`})
  }
  
  const [ scheme, token ] = parts
  const regex = /^Bearer$/i.test(scheme)

  if(!regex) {
    return res.status(401).send({ error: `Malformatted token`})
  }

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if(error)
      return res.status(401).send({ error: `Invalid token`})

    req.userId = decoded.id
    return next()
  })

}