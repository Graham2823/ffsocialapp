// import FantasyTeam from '../../models/fantasyTeam';

// export default async (req, res) => {
// 	console.log('req', req.query.team.QB);
// 	console.log("hit")
// 	try {
// 		const newFantasyTeam = new FantasyTeam({
// 			// Add the properties of the FantasyTeam here
// 			// For example:
// 			teamName: 'Your Team Name',
// 			// Add more properties as needed based on your schema
// 			roster: {
// 				QB: req.query.team.QB,
// 				RB1: req.query.team.RB1,
// 				RB2: req.query.team.RB2,
// 				Flex: req.query.team.Flex,
// 				WR1: req.query.team.WR1,
// 				WR2: req.query.team.WR2,
// 				TE: req.query.team.TE,
// 				Bench: req.query.team.Bench,
// 			},
// 		});

// 		// Save the newFantasyTeam document to the database
// 		const result = await newFantasyTeam.save();
// 		res.json(result);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

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


