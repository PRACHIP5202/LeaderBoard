import mongoose from "mongoose";
import User from "../models/user.js";
import History from "../models/history.js";

export async function addUser(req,res){
    try{
        const {username} = req.body
    
    if(!username){
        res.status(400).json({"message":"Username required"})
    }

    const user = new User({
        username,
        points:0
    })

    await user.save()

    res.status(201).json({"message":"Ok","user":user})
    }
    catch(e){
        console.log(`Error : ${e}`)
        res.status(500).json({"error":"server error"})
    }
}


export async function giveRandomPoints(req,res){
    try{
        const {username}=req.body

        if(!username){
             res.status(400).json({"message":"Username required"})
        }

        const randomPoints = Math.floor(Math.random()*10)+1

        const user = await User.findOneAndUpdate(
            {username},
            {$inc:{points:randomPoints}},
            {new:true,upsert:true}
        )

        const history = await History({
            username,
            pointsAdded:randomPoints
        })

        await history.save()

        if(!user){
            return res.status(404).json({"message":"user not found"})
        }

        res.status(200).json({
            "message":`Added ${randomPoints}`,
            "user":user
        })
    }
    catch(e){
        console.log(`Error : ${e}`)
        res.status(500).json({"error":"server error"})
    }
}