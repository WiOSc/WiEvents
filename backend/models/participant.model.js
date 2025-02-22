import mongoose from 'mongoose'

const participantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    timeTaken:{
        type: Number
    }
},{
    timeStamps: true
})

const Participant = mongoose.model('Participant', participantSchema)
export default Participant