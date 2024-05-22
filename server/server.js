import express from "express";
import { promises as fs } from "fs";

import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors()); // Enable CORS for all routes

const PORT = 3000;

app.use(express.json());

const client = await MongoClient.connect(url);
const db = client.db(dbName);
const employees = db.collection(collectionName);

app.get("/employees", async (req, res) => {
  try {
    const result = await employees.find({}).toArray();
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No employees for you! ☹");
  }
});

app.post("/search", async (req, res) => {
  try {
    // TODO: Add code that can search MongoDB based on a color value
    // from the Search text box.
    const { searchTerm } = req.body;

    if (!searchTerm) {
      return res.status(404).send({ error: "No search term given!" });
    }

    const searchedEmployees = await employees
      .find({
        name: searchTerm,
      })
      .toArray();
    console.log("Searched Employees ", searchedEmployees);

    res.json(searchedEmployees);
    console.log(
      `here are the employees named: ${searchTerm} you are looking for!`
    );
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send(
        "Hmm, something doesn't smell right... Error searching for employees"
      );
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
