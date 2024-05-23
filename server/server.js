import express from "express";
import { promises as fs } from "fs";

import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const employeeCollectionName = process.env.MONGO_DB_EMPLOYEES_COLLECTION;
const userDataCollectionName = process.env.MONGO_DB_USER_DATA_COLLECTION;

const app = express();
app.use(cors()); // Enable CORS for all routes

const PORT = 3000;

app.use(express.json());

const client = await MongoClient.connect(url);
const db = client.db(dbName);
const employees = db.collection(employeeCollectionName);
const userData = db.collection(userDataCollectionName);

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
      res.status(404).send({ error: "No search term given!" });
      res.json([{}]);
      return;
    }

    const searchedEmployees = await employees
      .find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { job_role: { $regex: searchTerm, $options: "i" } },
          { work_location: { $regex: searchTerm, $options: "i" } },
        ],
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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT uid FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ uid: result.rows[0].uid });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
