import clientPromise from "../../../lib/mongodb";
const bcrypt = require("bcryptjs");

const User = require('../../../models/UserModel');
const { createSecretToken } = require('../../util/secretToken');
export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("NFL_players_scraped_data");
    const { email, password, username } = req.body;
    const exisitingUser = await db.collection("User").findOne({email:email})
    if(exisitingUser){
      res.status(400).json({message: "User already exists with that email"})
      return
    }
    const createdAt = new Date();
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      email: email,
      password: hashedPassword,
      username: username,
      createdAt,
    };
    const result = await db.collection("User").insertOne(newUser); // Use plural collection name
    console.log('result', result)
    res.status(200).json({ message: "User saved" }); // Properly format the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); // Handle errors gracefully
  }
};
