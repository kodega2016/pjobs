const express = require("express");
const app = express();
const dotenv = require("dotenv");
const initDB = require("./config/initDB");
const morgan = require("morgan");
const path = require("path");

const errorHandler = require("./middleware/error");
const fileUpload = require("./middleware/fileUpload");
require("colors");

//Load enviroment variables
dotenv.config({ path: "./config/config.env" });

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database connection
initDB();
//Load Database models
require("./models/User");
require("./models/Company");
require("./models/Category");
require("./models/Job");

//Static files
app.use(express.static(path.join(__dirname, "public")));

app.post(
  "/upload",
  fileUpload({
    destination: "uploads",
    filename: "file",
  }),
  (req, res) => {
    const filePath = process.env.BASE_URL + "/uploads/" + req.file.filename;

    res.json({
      success: true,
      filePath,
    });
  }
);

//Morgan for logging
app.use(morgan("dev"));
//Routes
app.use("/auth", require("./routes/auth"));
app.use("/api/v1/categories", require("./routes/category"));
//Error handling
app.use(errorHandler);
//Server configuration
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (err, res) => {
  console.log(
    `Server is running in ${NODE_ENV} mode on port ${PORT}`.inverse.green
  );
});

process.on("unhandledRejection", async (err) => {
  console.log(`Server closed due to unhandled rejection ${err}`.red);
  await server.close();
  process.exit();
});
