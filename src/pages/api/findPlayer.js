import clientPromise from "../../../lib/mongodb"

export default async (req, res) => {
    console.log("this was hittttt")
    let name = req.query.name ? req.query.name : "";
  let team = req.query.team ? req.query.team : "";
    console.log(name)
console.log(team)
    try {
        const client = await clientPromise;
        const db = client.db("NFL_players_scraped_data");
 
        const pipeline = [
            // {
            //   $match: {
            //     "players.name": { $regex: new RegExp(name, "i") }
            //   }
            // },
            {
              $unwind: "$players"
            },
            {
              $match: {
                "players.name": { $regex: new RegExp(name, "i") },
                "players.position":{ $in: ["QB", "RB", "WR", "TE"] }
              }
            },
            {
              $sort: {
                "players.name": 1 // 1 for ascending, -1 for descending
              }
            },
            {
              $limit: 6
            },
            {
              $project: {
                _id: 0,
                players: 1 // To keep only the players array in the output
              }
            }
          ];
      
          // Add the $match stage for team condition if team is provided
          if (team) {
            pipeline.unshift({
              $match: {
                "team": team
              }
            });
          }
      
          const sortedPlayers = await db.collection("NFL_Players").aggregate(pipeline).toArray();
      
          res.json(sortedPlayers);
    } catch (e) {
        console.error(e);
    }
 };