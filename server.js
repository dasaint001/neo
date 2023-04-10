const express = require("express");
const validator = require("./validations");
const app = express();

app.use(express.json());

//endpoint to validate payload
app.post("/validate", validator.validate, (req, res) => {
  res.status(200).json({
    status: true,
  });
});

// Handling Errors
app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

console.log("working");
app.listen(3000, () => {
  console.log("api is running  on port 3000");
});
