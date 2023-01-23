const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true 
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "Genral"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

// const notes = new mongoose.model('notes', NotesShema)
// module.exports = notes

module.exports = mongoose.model('notes', NotesSchema); 
