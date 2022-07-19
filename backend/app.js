import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import authRouter from "./resources/routes/authentication.js";
const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.use("/auth", authRouter);

//Cath 404 error

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
