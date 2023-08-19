

import clientPromise from "../../../lib/mongodb";
import FantasyTeam from "../../../models/fantasyTeam";


export default async (req, res) => {
    // console.log(req.body)
    // console.log(req.body[QB])
    const team = JSON.parse(req.body)
   console.log(team)
    try {
        const client = await clientPromise;
        const db = client.db("NFL_players_scraped_data");

        // Create a new FantasyTeam object based on your schema model
        const newFantasyTeam = new FantasyTeam({
            teamName: team.teamName,
            roster: {
                QB: team.QB,
                RB: team.RB,
                Flex: team.Flex,
                WR: team.WR,
                TE: team.TE,
                bench: team.bench,
            },
        });

        // Insert the new FantasyTeam document into the "FantasyTeam" collection
        const result = await db.collection("FantasyTeam").insertOne(newFantasyTeam);
        console.log('result', result)

        res.json(result); // Return the newly created FantasyTeam document
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


