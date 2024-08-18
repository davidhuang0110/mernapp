const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    // this "user" is to associate with user and goal
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'   // add a reference because we need to know which model does the Object Id pertain to
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Goal', goalSchema)