// server/index.js

const express = require("express");
const bp = require('body-parser')
const PORT = process.env.PORT || 3001;

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!"});
});

app.post("/profile", (req, res) => {
  res.send({message: "Received Profile Information. Thanks!"});
  console.log(req.body)
});

app.post("/registration", (req, res) => {
  res.send({message: "Received Registration Information. Thanks!"});
  console.log(req.body)
});

app.post("/login", (req, res) => {
  res.send({message: "Received Login Information. Thanks!"});
  console.log(req.body)
});

// app.post("/test", (req,res) => {
//   console.log(res);
// })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
