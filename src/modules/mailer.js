const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const {host, port, user, pass} = require('../config/mail.json')

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('./src/resources/mail/auth'),
    layoutsDir: path.resolve('./src/resources/mail/auth'),
    defaultLayout: 'forgot_password.html',

  },
  viewPath: path.resolve('./src/resources/mail/auth'),
  extName: '.html'
}

transport.use('compile', hbs(handlebarOptions))

module.exports = transport