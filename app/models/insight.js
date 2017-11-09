const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InsightSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },

  findings: [{ type: String, required: true }]
});

InsightSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.__v;
  delete obj._id;
  return obj;
};

module.exports = mongoose.model('Insight', InsightSchema);
