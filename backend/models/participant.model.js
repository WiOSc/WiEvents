import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date
    }
}, {
    timestamps: true
});

const Participant = mongoose.model('Participant', participantSchema);
export default Participant;
