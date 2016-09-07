var db = require('../db');
var Schema = db.Schema;
var placeSchema = new Schema({
  name: {type: String, required: true},
  loc: {
    type: { type: String },
    coordinates: []
  },
	date: {type: Date, required: true, default: Date.now}
});
placeSchema.index({ loc: '2dsphere' });
var Place = db.model('Place', placeSchema);
module.exports = Place;
