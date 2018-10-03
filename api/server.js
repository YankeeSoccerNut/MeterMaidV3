const express = require("express");
const { postgraphile } = require("postgraphile");
const config = require("../config/config");

const app = express();

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

// Allow cross-origin resource sharing (CORS).....

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(
  postgraphile(
    process.env.DATABASE_URL ||
      "postgres://meterMiser:meterMiser@localhost:5432/meterMiser",
    "public",
    {
      graphiql: true, // expose graphiql UI at /graphiql
      dynamicJson: true, // return JSON to remove need to JSON.parse
      showErrorStack: true,
      extendedErrors: ["detail", "errcode"]
    }
  )
);

app.listen(4000, () => {
  console.log("Listening on port 4000...");
});
