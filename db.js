const mongoose = require('mongoose')

module.export = mongoose.connect('mongodb+srv://database-admin:fx1224ma@mycluster.q5svd.mongodb.net/dorxata-test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("Connected to database")
}).catch(err => {
    console.log(err)
})