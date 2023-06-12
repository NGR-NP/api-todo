const express = require("express");
const Routes = require("../routes/routes");
const cors = require("cors");
const errorHandler = require("../middleware/errHandler.middleware");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://192.168.100.100:3000"] }));
app.use("/api", Routes);
app.use(errorHandler);
app.all("*", (_req, res) => {
  res.status(404).json({ message: "route not avaliable!!" });
});

module.exports = app;
