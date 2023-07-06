import express from "express";

const app = express();

app.use("/", (req, res) => {
  return res.json("Welcome to typescript")
});

app.listen(3001, () => {
  console.log("App listening on port 3001");
});
