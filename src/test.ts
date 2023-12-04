import TNC from "./index.js";

let client = new TNC({ customURL: "http://localhost:9999", token: "3Wi7CcCZyTdBWHZMhjB0BXvkScJKQq5W0CvMUYvnJUKhiuj2TpNMYd3JRbQe6MCR" });
client.connect();
// console.log(await client.credits.balance(2));