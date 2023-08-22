

import clientPromise from "../../../lib/mongodb";
import FantasyTeam from "../../../models/fantasyTeam";
import { ObjectId } from "mongodb";



export default async (req, res) => {
    const { teamID } = req.query; 
  const objectIdTeamId = new ObjectId(teamID);
  
    try {
    const client = await clientPromise;
    const db = client.db("NFL_players_scraped_data");
    // Delete the FantasyTeam document based on the provided teamId
    const result = await db.collection("FantasyTeam").findOne({ _id: objectIdTeamId });
    // console.log("result", result);
    console.log(result)
    res.json(result); // Return the result of the delete oper
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


