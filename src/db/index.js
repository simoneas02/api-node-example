const  db = require('mongoose');

db.set('useFindAndModify', false);

db.connect('mongodb://localhost/noderest', { useNewUrlParser: true, useCreateIndex: true, });
db.Promise = global.Promise;

module.exports = db;

