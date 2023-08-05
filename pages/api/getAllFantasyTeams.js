
import clientPromise from "../../lib/mongodb";
import FantasyTeam from "../../models/fantasyTeam";

export default async (req, res) => {
	console.log(req.query)
    try {
        const client = await clientPromise;
        const db = client.db("NFL_players_scraped_data");
        const result = await db.collection("FantasyTeam").find({}).toArray();
        console.log('fantasy teams', result)
        res.json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
