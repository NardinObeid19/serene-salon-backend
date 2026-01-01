
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "salonserenewithdatabaseproj",
});

db.connect(err => {
  if (err) {
    console.error("DB ERROR:", err);
    return;
  }
  console.log("Database connected");
});
app.get("/", (req, res) => {
  res.send("SERVER WORKS");
});
app.get("/api/reservations", (req, res) => {
  db.query("SELECT * FROM reservations", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
app.post("/api/reservations", (req, res) => {
  const { name, date, goal } = req.body;
  db.query(
    "INSERT INTO reservations (name, date, goal) VALUES (?, ?, ?)",
    [name, date, goal],
    err => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Added" });
    }
  );
});
app.put("/api/reservations/:id", (req, res) => {
  const { id } = req.params;
  const { name, date, goal } = req.body;
  db.query(
    "UPDATE reservations SET name=?, date=?, goal=? WHERE id=?",
    [name, date, goal, id],
    err => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Updated" });
    }
  );
});
app.delete("/api/reservations/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM reservations WHERE id=?", [id], err => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Deleted" });
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
