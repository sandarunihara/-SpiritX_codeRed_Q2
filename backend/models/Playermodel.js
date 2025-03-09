import mongoose from "mongoose";

const { Schema } = mongoose;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    university: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    totalRuns: {
        type: Number,
        default: 0,
    },
    ballsFaced: {
        type: Number,
        default: 0,
    },
    inningsPlayed: {
        type: Number,
        default: 0,
    },
    wickets: {
        type: Number,
        default: 0,
    },
    oversBowled: {
        type: Number,
        default: 0,
    },
    runsConceded: {
        type: Number,
        default: 0,
    },
    playerpoints: {
        type: Number,
        default: 0,
    },
    battingstrikerate: {
        type: Number,
        default: 0,
    },
    bowlingstrikerate: {
        type: Number,
        default: 0,
    },
    playervalue: {
        type: Number,
        default: 0,
    },
    battingAverage:{
        type: Number,
        default: 0,
    },
    economyRate:{
        type: Number,
        default: 0,
    }
});

const Player = mongoose.model('Player', PlayerSchema);

export default Player;