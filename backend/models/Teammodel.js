import mongoose from 'mongoose';

const { Schema } = mongoose;

const TeamSchema = new Schema({
    teamname: {
        type: String,
        required: true,
        unique: true,
    },
    playerid: {
        type: Array,
        required: [],
    },
    totalruns: {
        type: Number,
        default: 0,
    },
    totalwickets: {
        type: Number,
        default: 0,
    },
    highest_run_score: {
        type: Object,
        default: {
            playername: '',
            runs: 0,
        },
    },
    highest_wicket_taken: {
        type: Object,
        default: {
            playername: '',
            wickets: 0,
        },
    },
});

const Team = mongoose.model('Team', TeamSchema);

export default Team;