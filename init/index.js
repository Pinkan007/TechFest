const mongoose = require("mongoose");
const event = require("../models/event.js");
const result = require("../models/result.js");
const initdata = require("./data.js");





main()
  .then((res) => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/techfest");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// const initDb = async () => {
//   await result.deleteMany({});
//   await result.insertMany(initdata.data);
//   console.log("insert successful");
// };

const initDb = async ()=>{
  await event.deleteMany({});
  await event.insertMany(initdata.data);
  console.log("insert successful")
}

initDb();
