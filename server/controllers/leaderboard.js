import express from 'express'
import User from '../models/user.js'
import History from '../models/history.js'


export async function getLeaderboard(req,res){
    try{
        const user =  await User.find().sort({points:-1})
        res.status(200).json({
            "message":"Ok",
            users:user
        })
    }
    catch(e){
        console.log(`Error: ${e}`)
        res.status(500).json({"message":e})
    }
}


export async function getHistory(req,res){
    try{
        const history = await History.find().sort({timestamp:-1})
        res.status(200).json({
            "message":"Ok",
            history:history
        })
    }
    catch(e){
        console.log(`Error: ${e}`)
        res.status(500).json({"message":e})
    }
}