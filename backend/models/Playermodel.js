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
    totalruns: {
        type: Number,
        default: 0,
    },
    ballsfaced: {
        type: Number,
        default: 0,
    },
    inningsplayed: {
        type: Number,
        default: 0,
    },
    wickets: {
        type: Number,
        default: 0,
    },
    oversbowled: {
        type: Number,
        default: 0,
    },
    runsconceded: {
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
});
