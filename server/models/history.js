import mongoose from "mongoose";

const pointsHistory = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    pointsAdded:{
        type:Number,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const History = mongoose.model("History",pointsHistory)

export default History
    
