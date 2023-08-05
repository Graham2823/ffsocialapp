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

import clientPromise from "../../lib/mongodb";
import FantasyTeam from "../../models/fantasyTeam";

export default async (req, res) => {
	console.log(req.query)
    try {
        const client = await clientPromise;
        const db = client.db("NFL_players_scraped_data");
		const benchArray = req.query.bench.split(',')
		console.log(benchArray)
		// console.log(typeof req.query.bench)
        // Create a new FantasyTeam object based on your schema model
        const newFantasyTeam = new FantasyTeam({
            // Add the properties of the FantasyTeam here
            // For example:
            teamName: req.query.teamName,
// 			// Add more properties as needed based on your schema
			roster: {
				QB: req.query.QB,
				RB1: req.query.RB1,
				RB2: req.query.RB2,
				Flex: req.query.Flex,
				WR1: req.query.WR1,
				WR2: req.query.WR2,
				TE: req.query.TE,
				bench: benchArray,
			},
            // Add more properties as needed based on your schema
        });

        // Insert the new FantasyTeam document into the "FantasyTeam" collection
        const result = await db.collection("FantasyTeam").insertOne(newFantasyTeam);

        res.json(result); // Return the newly created FantasyTeam document
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

