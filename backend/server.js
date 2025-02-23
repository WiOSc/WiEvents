import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import {connectDB} from './config/db.js'
import Participant from './models/participant.model.js';

dotenv.config()
const app = express();
app.use(cors()); 
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
app.patch("/participant", async (req, res) => {
    const { endTime } = req.body;
  
    if (!endTime) {
      return res.status(400).json({ error: "End time is required" });
    }
  
    try {
      // Find the most recent participant entry and update it
      const updatedParticipant = await Participant.findOneAndUpdate(
        {}, // Find any recent participant (you can modify to find a specific one if needed)
        { $set: { endTime } }, // Add endTime field
        { new: true, sort: { createdAt: -1 } } // Get the latest entry
      );
  
      if (!updatedParticipant) {
        return res.status(404).json({ error: "Participant not found" });
      }
  
      res.json({ message: "Event end time recorded successfully", updatedParticipant });
    } catch (error) {
      console.error("Error updating participant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

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