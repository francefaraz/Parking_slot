const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'db_password',
  database: 'parkinglot'
})

connection.connect()

console.log("Dsk",connection)
connection.query('SELECT * FROM park_slots AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows)
})

connection.end()
