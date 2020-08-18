const EventEmitter = require("events");
const http = require("http");

// const myEmitter = new EventEmitter();

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

//Our 'online store':
const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Sam");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9);

////////////////////////////////////////////////////////////////
//Create a small web server and listen to the event it emits:
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  //statement to find out why the server req emitted twice:
  // console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request.");
});

server.on("close", () => {
  console.log("Server closed");
});

//Statement to start the server:
server.listen(8000, "127.0.0.1", () => {
  console.log("Server listening on port 8000, waiting for requests...");
});
