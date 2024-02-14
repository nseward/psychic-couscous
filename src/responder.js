// add timestamps in front of log messages
// NOTE - this doesn't work when run inside VSCode
require("console-stamp")(console);
var fs = require("fs");
const bodyParser = require("body-parser");
var dateFormat = require("dateformat");

const express = require("express");
const { PassThrough } = require("stream");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("ok");
});

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  html = fs.readFileSync("./src/index.html");
  res.end(html);
});

app.get("/responder", (req, res) => {
  //let now = new Date().toISOString();
  var now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss.l");
  console.log(`msg recieved at ${now}`);
  res.send(`response sent at ${now}`);
});

app.post("/responder", (req, res) => {
  var now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss.l");
  sent_time = req.body.sent_time;
  dateFormat.console.log(`msg sent at ${sent_time}, msg recieved at ${now}`);
  res.send(`response sent at ${now}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
