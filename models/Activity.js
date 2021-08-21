const mongoose = require('mongoose')

const ActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    activity: [{
        updateProfile: {
            type: Date,
        },
        loggedOn:{
            type: Date
        },
        updatedPhoto:{
            type: Date
        } 
    }],   
})

module.exports = mongoose.model('Activity', ActivitySchema)