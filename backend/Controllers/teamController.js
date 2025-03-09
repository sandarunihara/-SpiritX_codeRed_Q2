import Player from "../models/Playermodel";
import Team from "../models/Teammodel";

export const addplayertoteamConroller= async(req, res) =>{
    const {playerid, teamname} = req.body;
    try{
        const player = await Player.findOne({playerid});
        if(!player){
            throw new Error("Player not found");
        }
        const team = await Team.findOne({
            teamname
        });
        if(!team){
            throw new Error("Team not found");
        }
        const playerid = team.playerid;
        playerid.push(player._id);
        const totalruns= team.totalruns;
        const totalwickets= team.totalwickets;
        const highest_run_score= team.highest_run_score;
        const highest_wicket_taken= team.highest_wicket_taken;

        const newtotalruns= totalruns + player.totalRuns;
        const newtotalwickets= totalwickets + player.totalwickets;
        if(player.totalRuns>highest_run_score.runs){
            highest_run_score.playername= player.name;
            highest_run_score.runs= player.totalRuns;
        }
        if(player.totalwickets>highest_wicket_taken.wickets){
            highest_wicket_taken.playername= player.name;
            highest_wicket_taken.wickets= player.totalwickets;
        }

        payload={
            playerid,
            totalruns: newtotalruns,
            totalwickets: newtotalwickets,
            highest_run_score,
            highest_wicket_taken,
        }
        const updatedteam= await Team.findOneAndUpdate({teamname}, payload, {new: true});

        res.status(200).json({
            data: updatedteam,
            success: true,
            error: false,
            message: "Team update successfully"
        });


}catch(error){
    res.status(500).json({
        success: false,
        error: true,
        message: error.message
    });

}
}
