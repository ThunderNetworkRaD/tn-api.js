import TNC from "./index.js";

let client = new TNC({ customURL: "http://localhost:9999", token: "" });
client.connect();
// console.log(await client.credits.balance(2));