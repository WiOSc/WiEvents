import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import mongoose from "mongoose";
import path from "path";
import {connectDB} from './config/db.js'
import Participant from './models/participant.model.js';

dotenv.config()
const app = express();
app.use(cors()); 
app.use(express.json())
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.get("/", (req,res) => {
    res.send("Server is ready")
})
app.post("/participant", async (req, res) => {
    try {
        const participant = req.body;
        const newParticipant = new Participant(participant);
        const savedParticipant = await newParticipant.save();

        res.status(201).json({ 
            success: true,
            _id: savedParticipant._id  // Ensure _id is included
        });
    } catch (error) {
        console.error("Error while creating user", error.message);
        res.status(500).json({ success: false });
    }
});

app.patch("/participant/:id", async (req, res) => {
    const { id } = req.params;
    const { endTime } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Participant ID is required" });
    }

    if (!endTime) {
        return res.status(400).json({ error: "End time is required" });
    }

    try {
        // Ensure the ID is a valid MongoDB ObjectId before querying
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid participant ID format" });
        }

        const updatedParticipant = await Participant.findOneAndUpdate(
            { _id: id },  // Corrected filter (find participant by _id)
            { $set: { endTime } }, 
            { new: true } // Return the updated document
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

  

  app.get("/leaderboard", async (req, res) => {
    try {
      const participants = await Participant.find({
        startTime: { $exists: true },
        endTime: { $exists: true }
      });
  
      const leaderboard = participants
        .map((participant) => {
          const startTime = new Date(participant.startTime);
          const endTime = new Date(participant.endTime);
          const timeTaken = (endTime - startTime) / 1000; // Convert to seconds
  
          return {
            name: participant.name,
            timeTaken
          };
        })
        .sort((a, b) => a.timeTaken - b.timeTaken); // Sort by time taken (ascending)
  
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
}
app.listen(PORT, () => {
    connectDB()
    console.log('Server started at specified port')
})