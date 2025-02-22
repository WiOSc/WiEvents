import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import Participant from './models/participant.model.js';

dotenv.config()
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000

app.get("/", (req,res) => {
    res.send("Server is ready")
})
app.post("/participant", async(req,res) => {
    const participant = req.body

    const newParticipant = new Participant(participant)
    try{
        await newParticipant.save()
        res.status(201).json({ success:true })
    }catch(error){
        console.error("Error while creating user", error.message)
        res.status(500).json({ success:false })
    }
})

app.get("/leaderboard",async (req,res) => {
    try{
        const participants = await Participant.find({})
        res.status(200).json({ success: true })
    }catch(error){
        console.log("error in fetching products", error.message)
        res.status(500).json({ success: false })
    }
})

app.listen(PORT, () => {
    connectDB()
    console.log('Server started at specified port')
})