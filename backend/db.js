const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/savenotes?directConnection=true"

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("mongoose connect succesfully")
    })
}

module.exports = connectToMongo;