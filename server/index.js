const express = require("express"),
  app = express(),
  template = require("./template");
path = require("path");

// Serving static files
app.use("/assets", express.static(path.resolve(__dirname, "assets")));

// start the server
app.listen(process.env.PORT || 8000);

// our apps data model
const data = require("../src/reducers");

let initialState = {
  apps: data
};

//SSR function import
import { render } from "./server";
// server rendered home page
app.get("/", (req, res) => {
  const { preloadedState, content } = render(initialState);
  const response = template("Server Rendered Page", preloadedState, content);
  res.setHeader("Cache-Control", "assets, max-age=604800");
  res.send(response);
});

// tiny trick to stop server during local development

app.get("/exit", (req, res) => {
  if (process.env.PORT) {
    res.send("Sorry, the server denies your request");
  } else {
    res.send("shutting down");
    process.exit(0);
  }
});
