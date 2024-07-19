const exp = require("express");
const app = exp();
const fs = require("fs");
const events = require("events");
// Event Emitter
app.get("/events", (req, res) => {
  let eventEmitter = new events.EventEmitter();
  eventEmitter.on("some_event", (msg) => {
    console.log(msg);
  });
  eventEmitter.emit("some_event", "Event Emitter");
  res.sendStatus(200);
});

// Readable stream
app.get("/rs", (req, res) => {
  let readStream = fs.createReadStream(
    "C:/Users/SRIHITHA/Downloads/Final_Abstract.docx",
    "utf-8"
  );
  let c = 0;
  readStream.on("data", (txt) => {
    console.log(txt, ++c);
  });
  res.sendStatus(200);
});

// Writable Stream
app.get("/ws", (req, res) => {
  let readStream = fs.createReadStream(
    "C:/Users/SRIHITHA/Downloads/Final_Abstract.docx",
    "utf-8"
  );
  let writeStream = fs.createWriteStream(__dirname + "/write.txt", "utf-8");
  readStream.on("data", (txt) => {
    writeStream.write(txt);
  });
  res.sendStatus(200);
});

// Pipeline
app.get("/pipe", (req, res) => {
  let readStream = fs.createReadStream(
    "C:/Users/SRIHITHA/Downloads/Final_Abstract.docx",
    "utf-8"
  );
  let writeStream = fs.createWriteStream(__dirname + "/pipe.txt", "utf-8");
  //   readStream.pipe(writeStream);
  readStream.pipe(res);
  //   res.sendStatus(200);
});

app.listen(3000, () => console.log("Server listening to port 3000..."));
