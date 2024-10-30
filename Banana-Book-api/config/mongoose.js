const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    try{
        await mongoose.connect(process.env.DBURI)
        .then(() => {
            console.log("Succesfully connected to Mongo!");
        })
    } catch{
        console.log("Connection failed!!");
    }
}

module.exports = {connect};