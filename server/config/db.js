import mongoose from "mongoose"

export async function db(){
    const url=process.env.URL

    await mongoose.connect(url)
    .then(
        ()=>{
            console.log('MongoDB Connected')
        }
    )
    .catch(e=>{
        console.log(`err : ${e}`)
    })
}