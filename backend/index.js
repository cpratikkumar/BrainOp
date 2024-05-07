const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoConnection = require("./databaseconnection/databaseconnection");
const port = process.env.PORT;
const userRouter = require("./routes/userroute");
const postRouter = require("./routes/postroute");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoConnection();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your allowed origin
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", postRouter);
app.listen(port, () => {
  console.log(`Server has been running at port :${port}`);
});
