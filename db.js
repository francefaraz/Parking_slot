const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'db_password',
  database: 'parkinglot'
})


connection.connect()
module.exports=connection;