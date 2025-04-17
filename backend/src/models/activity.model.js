const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
    userId:{
        type: String,
       
    },
    distance:{
        type:Number,
        required:true
    },
    steps:{
        type:Number
    },
    date:{
        type: Date,
        default: Date.now,
        required:true
    }
}, {timestamps: true})

module.exports = mongoose.model("activity", activitySchema)