import Player from "../models/Playermodel.js";
import Team from "../models/Teammodel.js";
import User from "../models/Usermodel.js";

export const addplayertoteamConroller = async (req, res) => {
  const { playerid, teamname, userid } = req.body;
  try {
    console.log(`Received request to add player to team: ${teamname}`);
    const player = await Player.findOne({ _id: playerid });
    if (!player) {
      throw new Error("Player not found");
    }
    const team = await Team.findOne({ teamname });
    if (!team) {
      throw new Error(`Team not found: ${teamname}`);
    }
    const user = await User.findOne({ _id: userid });
    if (!user) {
      throw new Error(`User not found: ${userid}`);
    }

    const remainingcash = user.cashamount - player.playervalue;
    if (remainingcash < 0) {
      throw new Error("Insufficient cash");
    }
    const remaincount = user.teamcount + 1;
    if (remaincount >= 11) {
      throw new Error("Maximum team limit reached");
    }
    const playerIds = team.playerid; // Renamed variable to avoid conflict
    playerIds.push(player._id);

    const totalruns = Number(team.totalruns) || 0;
    const totalwickets = Number(team.totalwickets) || 0;
    const highest_run_score = team.highest_run_score || {
      playername: "",
      runs: 0,
    };
    const highest_wicket_taken = team.highest_wicket_taken || {
      playername: "",
      wickets: 0,
    };
    const totalpoints = Number(team.totalpoints) || 0;

    const newtotalruns = totalruns + (Number(player.totalRuns) || 0);
    const newtotalwickets = totalwickets + (Number(player.totalwickets) || 0);
    const newtotalpoints = totalpoints + (Number(player.totalPoints) || 0);

    if (Number(player.totalRuns) > highest_run_score.runs) {
      highest_run_score.playername = player.name;
      highest_run_score.runs = Number(player.totalRuns);
    }
    if (Number(player.totalwickets) > highest_wicket_taken.wickets) {
      highest_wicket_taken.playername = player.name;
      highest_wicket_taken.wickets = Number(player.totalwickets);
    }

    const teamPayload = {
      playerid: playerIds,
      totalruns: newtotalruns,
      totalwickets: newtotalwickets,
      totalpoints: newtotalpoints,
      highest_run_score,
      highest_wicket_taken,
    };
    const updatedteam = await Team.findOneAndUpdate({ teamname }, teamPayload, {
      new: true,
    });

    const userPayload = {
      cashamount: remainingcash,
      teamcount: remaincount,
    };
    const updatedUser = await User.findOneAndUpdate(
      { _id: userid },
      userPayload,
      {
        new: true,
      }
    );

    res.status(200).json({
      data: { updatedteam, updatedUser },
      success: true,
      error: false,
      message: "Team and user updated successfully",
    });
  } catch (error) {
    console.error("Error in addplayertoteamConroller:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const getTeamPlayers = async (req, res) => {
  const { teamname } = req.params;
  try {
    const team = await Team.findOne({ teamname });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    const playerIds = team.playerid;
    const players = await Player.find({ _id: { $in: playerIds } });
    res.status(200).json({ data: players });
  } catch (error) {
    console.error("Error in getTeamPlayers:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json({ data: player });
  } catch (error) {
    console.error("Error in getPlayerById:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
