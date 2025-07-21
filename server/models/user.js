import mongoose from "mongoose"

const UserDetails= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        required:true,
        default:0
    }
})

const User = mongoose.model("User",UserDetails)

export default User;