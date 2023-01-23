const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo()
const app = express()
const port = 5000


app.use(express.json())
app.use(cors())

// Availble Routes
app.use("/api/auth", require('./routes/auth'))
app.use("/api/note", require('./routes/note')) 

// app.get('/', (req, res)=>{
//   res.send('run...')
//   console.log("run...")
//   // res.send(req.body)
// })


app.listen(port, () => {
  console.log(`iNotebook-Backend app listening on port ${port}`)
})
