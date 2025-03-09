import Player from "../models/Playermodel.js";

export const addplayerConroller= async(req, res) =>{
    const {
      name,
      university,
      category,
      totalRuns,
      ballsFaced,
      inningsPlayed,
      wickets,
      oversBowled,
      runsConceded,
    } = req.body;
  try {

    const player = await Player.findOne({ name, university });

    if (player) {
      throw new Error("Player already exist");
    }
    if (!name) {
      throw new Error("Please provide player name");
    }
    if (!university) {
      throw new Error("Please provide university");
    }
    if (!category) {
      throw new Error("Please provide category");
    }
    

    const battingStrikeRate = (totalRuns / ballsFaced) * 100;
    const battingAverage = totalRuns / inningsPlayed;
    const bowlingStrikeRate = oversBowled / wickets;
    const economyRate = (runsConceded / oversBowled) * 6;

    const playerPoints =battingStrikeRate / 5 + battingAverage * 0.8 + 500 / bowlingStrikeRate + 140 / economyRate;

    const valueInRupees =Math.round(((9 * playerPoints + 100) * 1000) / 50000) * 50000;
    
    const payload = {
      ...req.body,
      playerpoints:playerPoints,
      battingstrikerate:battingStrikeRate,
      bowlingstrikerate:bowlingStrikeRate,
      playervalue:valueInRupees,
      economyRate:economyRate,
      battingAverage:battingAverage
    };

    const playerdata= new Player(payload);
    const savedata= await playerdata.save();

    res.status(200).json({
        data: savedata,
        success: true,
        error: false,
        message: "Player add successfully"
    });

  } catch (err) {
    res.status(500).json({
        success: false,
        error: true,
        message: err.message
    });
  }
};


export const updatePlayerController = async (req, res) => {
    const { name, university, category, totalRuns, ballsFaced, inningsPlayed, wickets, oversBowled, runsConceded } = req.body;

    try {
        const player = await Player.findOne({ name, university });

        if (!player) {
            throw new Error("Player not found");
        }

        // Update only allowed fields
        player.category = category ?? player.category;
        player.totalRuns = totalRuns ?? player.totalRuns;
        player.ballsFaced = ballsFaced ?? player.ballsFaced;
        player.inningsPlayed = inningsPlayed ?? player.inningsPlayed;
        player.wickets = wickets ?? player.wickets;
        player.oversBowled = oversBowled ?? player.oversBowled;
        player.runsConceded = runsConceded ?? player.runsConceded;

        // Recalculate stats
        const battingStrikeRate = (player.totalRuns / player.ballsFaced) * 100;
        const battingAverage = player.totalRuns / player.inningsPlayed;
        const bowlingStrikeRate = player.oversBowled / player.wickets;
        const economyRate = (player.runsConceded / player.oversBowled) * 6;
        const playerPoints = battingStrikeRate / 5 + battingAverage * 0.8 + 500 / bowlingStrikeRate + 140 / economyRate;
        const valueInRupees = Math.round(((9 * playerPoints + 100) * 1000) / 50000) * 50000;

        // Update calculated fields
        player.battingstrikerate = battingStrikeRate;
        player.bowlingstrikerate = bowlingStrikeRate;
        player.economyRate = economyRate;
        player.battingAverage = battingAverage;
        player.playerpoints = playerPoints;
        player.playervalue = valueInRupees;

        const updatedPlayer = await player.save();

        res.status(200).json({
            data: updatedPlayer,
            success: true,
            error: false,
            message: "Player details updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message
        });
    }
};


export const findPlayerController = async (req, res) => {
    const { name, university } = req.params;
    

    try {
        const player = await Player.findOne({ name, university });

        if (!player) {
            throw new Error("Player not found");
        }

        res.status(200).json({
            data: player,
            success: true,
            error: false,
            message: "Player found successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message
        });
    }
};


export const findAllPlayersController = async (req, res) => {
    try {
        const players = await Player.find();

        if (!players.length) {
            throw new Error("No players found");
        }

        res.status(200).json({
            data: players,
            success: true,
            error: false,
            message: "Players retrieved successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message
        });
    }
};


export const deletePlayerController = async (req, res) => {
    const { name, university } = req.body;

    try {
        const player = await Player.findOneAndDelete({ name, university });

        if (!player) {
            throw new Error("Player not found");
        }

        res.status(200).json({
            success: true,
            error: false,
            message: "Player deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: err.message
        });
    }
};


