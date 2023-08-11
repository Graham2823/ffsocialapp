import clientPromise from "../../../lib/mongodb"

export default async (req, res) => {
    console.log("this was hit")
    try {
        const client = await clientPromise;
        const db = client.db("NFL_players_scraped_data");
 
        const teams = await db
            .collection("NFL_Players")
            .find({})
            .toArray();
        res.json(teams);
    } catch (e) {
        console.error(e);
    }
 };