const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  event_name: {
    type: String,
  },
  team_name: {
    type: String,
  },
  position: {
    type: String,
  },
  year: {
    type: String,
  },
});

const result = mongoose.model("result", resultSchema);

module.exports = result;
