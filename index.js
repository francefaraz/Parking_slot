const express = require('express')
const app = express()
const port = 5000
const cors=require('cors')
const vehicleadd= require('./routes/vehicle')
app.get('/', (req, res) => res.send('Hello World!'))


app.use(express.json())
app.use(cors())
app.use("/vehicle",vehicleadd);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))