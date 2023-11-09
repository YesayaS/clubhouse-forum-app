const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PasscodeSchema = new Schema({
  admin: { type: String, required: true },
  member: { type: String, required: true },
});

// Export model
module.exports = mongoose.model("Passcode", PasscodeSchema);
