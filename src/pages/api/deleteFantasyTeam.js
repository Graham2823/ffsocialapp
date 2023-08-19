import clientPromise from "../../../lib/mongodb";
import FantasyTeam from "../../../models/fantasyTeam";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { teamID } = req.query; // Assuming you're passing the team ID as a query parameter
  const objectIdTeamId = new ObjectId(teamID);
  console.log("team ID", teamID)

  try {
    const client = await clientPromise;
    const db = client.db("NFL_players_scraped_data");

    // Delete the FantasyTeam document based on the provided teamId
    const result = await db.collection("FantasyTeam").deleteOne({ _id: objectIdTeamId });
    // console.log("result", result);

    res.json(result); // Return the result of the delete operation
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
