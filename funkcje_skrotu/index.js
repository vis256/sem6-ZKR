const jsSHA = require("jssha");
const md5 = require("md5");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

function test(string) {
  console.log("Testing:", string);

  console.log("MD5");
  let timeStart = performance.now();

  console.log(md5(string));

  let timeEnd = performance.now();
  console.log((timeEnd - timeStart).toFixed(2));

  //   =============
  console.log("SHA-1");
  timeStart = performance.now();

  console.log(new jsSHA("SHA-1", "TEXT").update(string).getHash("HEX"));

  timeEnd = performance.now();
  console.log((timeEnd - timeStart).toFixed(2));

  //   =============
  console.log("SHA-224");
  timeStart = performance.now();

  console.log(new jsSHA("SHA-224", "TEXT").update(string).getHash("HEX"));

  timeEnd = performance.now();
  console.log((timeEnd - timeStart).toFixed(2));

  //   =============
  console.log("SHA-256");
  timeStart = performance.now();

  console.log(new jsSHA("SHA-256", "TEXT").update(string).getHash("HEX"));

  timeEnd = performance.now();
  console.log((timeEnd - timeStart).toFixed(2));

  //   =============
  console.log("SHA3-256");
  timeStart = performance.now();

  console.log(new jsSHA("SHA3-256", "TEXT").update(string).getHash("HEX"));

  timeEnd = performance.now();
  console.log((timeEnd - timeStart).toFixed(2));

  //   =============
  console.log("SHA3-512");
  timeStart = performance.now();

  console.log(new jsSHA("SHA3-512", "TEXT").update(string).getHash("HEX"));

  timeEnd = performance.now();
  console.log((timeEnd - timeStart).toFixed(2));
}

rl.on("line", (line) => {
  test(line);
});
// let xd = "";
// for (let i = 0; i < 10000000; i++) {
//   xd += "A";
// }
// test(xd);
