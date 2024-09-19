const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
  },
  fulldescription: {
    type: String,
  },
  rule: {
    type: String,
  },
  shortdescription: {
    type: String,
  },

  image: {
    type: String,

    default: "https://www.gec.edu.in/assets/img/hero/contactimg.jpg",
    // set: (v) => {
    //   v === ""
    //     ? "https://www.gec.edu.in/assets/img/hero/contactimg.jpg"
    //     : v;
    // }
  },

  coordinator_name: {
    type: String,
  },
  teacher_name: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  register_link: {
    type: String,
    default: "https://www.google.co.in/",
  },
});

const event = mongoose.model("event", eventSchema);

module.exports = event;
