import express from "express";
import { json } from "body-parser";
import { todoRouter } from "./routes/todoRoute";
import errorMiddleware from "./middleware/errorMiddleware";

const morgan = require("morgan");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

const connectDB = require("./database/mongooseConnect");
connectDB();

const app = express();

app.use(
  cors({ origin: "*", options: ["PUT", "OPTIONS", "DELETE", "POST", "GET"] })
);

app.use(json());
app.use(todoRouter);

app.use(morgan("tiny"));
app.use(errorMiddleware);

app.use(bodyparser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
