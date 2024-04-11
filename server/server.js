const express = require("express");
const app = express();
const port = 5001
app.set('view engine', 'ejs');

app.get("/api", (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree"] });
});
// app.get("/", (req, res) => {
//   res.render("Home");
// });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

