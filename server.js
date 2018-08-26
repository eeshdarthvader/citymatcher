const express = require("express");

const app = express();

const proxy = require("http-proxy-middleware");

const cors = require("cors");

const serverConfig = {
  HOST: "localhost",
  PORT: 3001
};

app.use(cors());

app.listen(serverConfig.PORT, serverConfig.HOST, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(
    `Listening at http:// ${serverConfig.HOST} : ${serverConfig.PORT}`
  );
});
