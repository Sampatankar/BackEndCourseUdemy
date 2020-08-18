//Core modules:
const fs = require("fs");
const http = require("http");
const url = require("url");
//3rd Party modules:
const slugify = require("slugify");
//Our own modules:
const replaceTemplate = require("./modules/replaceTemplate");

/////////////////////////////////////////////////////////////////////////
//FILES:

// //'Blocking', Synchronous method:
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

//'Non-Blocking', Asynchronous method:
//Basic example:
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// console.log("Will read file!");

// //Multiple call-backs: reading files and writing a file:
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("error reading start.txt");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written 😍");
//       });
//     });
//   });
// });
// console.log("Will read file!");

/////////////////////////////////////////////////////////////////////////
//SERVER:
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//Use slugify:
const slugs = dataObj.map((el) => slugify(el.productName, {
  lower: true
}));
console.log(slugs);

const server = http.createServer((req, res) => {
  //Create two variables from the queryID and pathname of the url:
  const {
    query,
    pathname
  } = url.parse(req.url, true);

  //Overview route:
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html"
    });
    const cardsHTML = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
    res.end(output);

    //Product route:
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html"
    });
    //Retrieve an element based on a query string:
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API route:
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json"
    });
    res.end(data);

    //Not found route:
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});