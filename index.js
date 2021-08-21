const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())


require('./db')

app.use('/api/users', require('./routes/users'))


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})