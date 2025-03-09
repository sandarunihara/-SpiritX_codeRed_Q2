import React, { useState, useEffect } from 'react';

const LeaderBoard = () => {
    const [teams, setTeams] = useState([]); 

    
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5050/api/auth/leaderboard", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responsedata = await response.json();
            if (responsedata.success) {
                setTeams(responsedata.data); 
            } else {
                console.error("Failed to fetch leaderboard data");
            }
        } catch (error) {
            console.error("Error fetching leaderboard data:", error);
        }
    };

    
    useEffect(() => {
        fetchData();
    }, []);

    
    const sortedTeams = [...teams].sort((a, b) => b.totalruns - a.totalruns);

    return (
        <div className="p-6 bg-white w-full">
            <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
            <table className="w-full border-collapse border border-gray-300 text-center">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3">Rank</th>
                        <th className="p-3">Team Name</th>
                        <th className="p-3">Total Runs</th>
                        <th className="p-3">Total Wickets</th>
                        <th className="p-3">Highest Run Scorer</th>
                        <th className="p-3">Highest Wicket Taker</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTeams.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="p-3 text-center">No data available</td>
                        </tr>
                    ) : (
                        sortedTeams.map((team, index) => (
                            <tr key={team._id} className="border-b border-gray-300">
                                <td className="p-3 font-bold">#{index + 1}</td>
                                <td className="p-3">{team.teamname}</td>
                                <td className="p-3 font-semibold">{team.totalruns}</td>
                                <td className="p-3">{team.totalwickets}</td>
                                <td className="p-3">
                                    {team.highest_run_score.playername} ({team.highest_run_score.runs} runs)
                                </td>
                                <td className="p-3">
                                    {team.highest_wicket_taken.playername} ({team.highest_wicket_taken.wickets} wickets)
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderBoard;
