import Team from "../models/Teammodel.js";

export const findallteam= async(req, res) =>{
    try{
        const teams= await Team.find();
        if(!teams.length){
            throw new Error("No teams found");
        }
        res.status(200).json({
            data: teams,
            success: true,
            error: false,
            message: "Teams retrieved successfully"
        });
    }catch(error){
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        });
    }
}