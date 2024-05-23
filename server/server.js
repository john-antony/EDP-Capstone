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
          { manager_id: Number(searchTerm) },
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
  try {
    const { username, password } = req.body;

    const user = await userData
      .find({
        name: username,
        password: Number(password),
      })
      .toArray();
    if (user) {
      console.log("Grabbing user:", user[0].name);
      res.status(200).json({ username: user[0].name, fk_id: user[0].fk_id });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/userObj", async (req, res) => {
  try {
    const { user } = req.body;

    const userObj = await employees
      .find({
        unit_id: user.fk_id,
      })
      .toArray();

    if (userObj) {
      console.log("Grabbing user:", userObj);
      res.status(200).json(userObj[0]);
    } else {
      res.status(401).json({ message: "Could not get user object" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
