const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ForgotRouter = require("./routes/ForgotRouter.js");
const UserRouter = require("./routes/UserRouter.js");
const HomeRouter = require("./routes/HomeRouter.js");
const TinderRouter = require("./routes/TinderRouter.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(UserRouter);
app.use("/home", HomeRouter);
app.use("/forgotpassword", ForgotRouter);
app.use("/tinder", TinderRouter);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
