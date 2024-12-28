const Venue = require("../models/Venue");

const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

const converter = (() => {
  const earthRadius = 6371;
  const radian2Kilometer = (radian) => {
    return parseFloat(radian * earthRadius);
  };

  const kilometer2Radian = (distance) => {
    return parseFloat(distance / earthRadius);
  };

  return { radian2Kilometer, kilometer2Radian };
})();

exports.listVenues = function (req, res, next) {
  const lat = parseFloat(req.query.lat) || 0;
  const long = parseFloat(req.query.long) || 0;

  const point = { type: "Point", coordinates: [lat, long] };

  const geoOptions = {
    distanceField: "dis",
    spherical: true,
    maxDistance: converter.radian2Kilometer(100),
  };

  try {
    Venue.aggregate([
      {
        $geoNear: {
          near: point,
          ...geoOptions,
        },
      },
    ]).then((result) => {
      const venues = result.map(function (venue) {
        return {
          distance: converter.kilometer2Radian(venue.dis),
          name: venue.name,
          address: venue.address,
          rating: venue.rating,
          foodAndDrink: venue.foodAndDrink,
          id: venue._id,
        };
      });

      if (venues.length > 0) createResponse(res, "200", venues);
      else createResponse(res, "200", []);
    });
  } catch (error) {
    createResponse(res, "404", error);
  }
};

exports.addVenue = async (req, res, next) => {
  console.log(req.body);
  try {
    await Venue.create({
      ...req.body,
      coordinates: [req.body.lat, req.body.long],
      hours: [
        {
          days: req.body.days,
          open: req.body.open,
          close: req.body.close,
          isClosed: req.body.isClosed,
        },
      ],
    }).then((response) => {
      createResponse(res, "201", response);
    });
  } catch (err) {
    console.log(err);
    createResponse(res, "400", err);
  }
};

exports.getVenue = async (req, res, next) => {
  try {
    const venudId = req.params.venueId;

    await Venue.findById(venudId)
      .exec()
      .then((venue) => {
        createResponse(res, "200", { venue });
      });
  } catch (err) {
    createResponse(res, "400", "Böyle bir mekan yok!");
  }
};

exports.updateVenue = async (req, res, next) => {
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(req.params.venueId, {
      ...req.body,
      coordinates: [req.body.lat, req.body.long],
      hours: [
        {
          days: req.body.day1,
          open: req.body.open1,
          close: req.body.close1,
          isClosed: req.body.isClosed1,
        },
      ],
    });

    createResponse(res, "201", updatedVenue);
  } catch (error) {
    createResponse(res, "400", { status: "Güncelleme başarısız." });
  }
};

exports.deleteVenue = async (req, res, next) => {
  const veneuId = req.params.venueId;
  try {
    await Venue.findByIdAndDelete(veneuId).then((venue) => {
      createResponse(res, 200, {
        status: venue.name + " isimli mekan Silindi",
      });
    });
  } catch (err) {
    createResponse(res, 404, { status: "Böyle bir mekan yok!" });
  }
};
