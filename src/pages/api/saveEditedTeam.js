import clientPromise from "../../../lib/mongodb";
import FantasyTeam from "../../../models/fantasyTeam";
import { ObjectId } from "mongodb";



export default async (req, res) => {
    const team = JSON.parse(req.body)
    console.log(team);

    try {
        const client = await clientPromise;
        const db = client.db("NFL_players_scraped_data");

        // Assuming team._id is the identifier for the team you want to update
        const teamId = team._id;
        console.log('id', teamId)

        // Create an object with the updated team data
        const updatedTeamData = {
            teamName: team.teamName,
            roster: {
                QB: team.QB,
                RB: team.RB,
                Flex: team.Flex,
                WR: team.WR,
                TE: team.TE,
                bench: team.bench,
            },
        };

        // Update the existing FantasyTeam document with the new data
        const result = await db.collection("FantasyTeam").updateOne(
            { _id: ObjectId(teamId) }, // Find the team by _id
            { $set: updatedTeamData }   // Update the fields with new data
        );

        console.log('result', result);

        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


