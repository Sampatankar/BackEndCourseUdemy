const fs = require('fs');
//efficient server creation:
const server = require('http').createServer();

server.on("request", (req, res) => {
  // //Solution 1 - Read a file into a variable and send to client:
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // //Solution 2 - Streams:
  // const readable = fs.createReadStream('test-file.txt')
  // readable.on('data', chunk => {
  //   res.write(chunk);
  // })
  // readable.on('end', () => {
  //   res.end();
  // })
  // readable.on('error', err => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });

  //Solution 3 - Use pipe operator to fix 'back-pressure':
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  //readableSource.pipe(writeableDest)
});

//Statement to start the server:
server.listen(8000, "127.0.0.1", () => {
  console.log("Server listening on port 8000, waiting for requests...");
});