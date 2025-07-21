import express from 'express' 
import cors from 'cors'

import 'dotenv/config'
import {db} from './config/db.js'

import userRoutes from './routes/routes.js'



const app = express()

app.use(cors())
app.use(express.json())

const PORT=process.env.PORT


db()

app.use('/api/v1',userRoutes)


app.get('/',(req,res)=>{
    res.json({"message":"Hi from server"})
})


app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
})