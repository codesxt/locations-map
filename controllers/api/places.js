var Place = require('../../models/place')
var router = require('express').Router()
router.get('/', function(req, res){
  Place.find()
  .sort('-date')
  .exec(function(err, places){
		if(err) {return next(err)};
		res.json(places);
	});
});
router.post('/', function(req, res){
  var place = new Place({
    name: req.body.name,
    loc: {
      type: "Point",
      coordinates: [req.body.loc.coordinates[0],
                    req.body.loc.coordinates[1]]
    }
  });
  place.save(function(err, place){
		if(err) {return next(err)};
		res.json(201, place);
	});
});
router.get('/addtest', function(req, res){
  var xpos = -35.447001328290014+(Math.random()-0.5)*0.01
  var ypos = -71.69618189334871+(Math.random()-0.5)*0.01
  var place = new Place({
    name: "testPlace",
    loc: {
      type: "Point",
      coordinates: [xpos, ypos]
    }
  });
  place.save(function(err, place){
		if(err) return console.error(err);
		res.json(201, place);
	});
});
module.exports = router
