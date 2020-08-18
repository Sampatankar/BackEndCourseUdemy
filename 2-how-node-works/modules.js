// //Arguments and wrapper template function in node:
// console.log(arguments);
// console.log(require("module").wrapper);

//How to import/export modules using node (MODULE.EXPORTS): 
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

// //ADDING TO THE PROPERTIES TO THE EXPORT MODULE ITSELF:
// const calc2 = require("./test-module-2");
// console.log(calc2.add(2, 5));

//importing properties and defining them using destructured functions:
const {
  add,
  multiply,
  divide
} = require("./test-module-2");
console.log(multiply(2, 5));

//CACHING:
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();