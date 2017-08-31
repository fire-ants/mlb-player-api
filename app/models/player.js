const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  mlbid: { type: Number, unique: true, required: true },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  position: { type: String, required: true },

  bats: { type: String, required: true },

  birthDate: { type: Date, required: true },

  height: { type: String, required: true },
  weight: { type: String, required: true },

  team: { type: String, required: true }
});

 PlayerSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.__v;
  delete obj._id;
  return obj;
};

module.exports = mongoose.model('Player', PlayerSchema);
