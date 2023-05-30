const { Coordinate } = require("../models");

const createOrUpdateCoordinate = async (req) => {
  const { address_id, lat, lng } = req.body;

  const checkCoordinate = await Coordinate.findOne({ where: { address_id } });
  if (checkCoordinate) {
    const result = await Coordinate.update(
      {
        lat: lat.toString(),
        lng: lng.toString(),
      },
      { where: { address_id } }
    );

    return result;
  }

  const latDecimal = parseFloat(lat);
  const lngDecimal = parseFloat(lng);

  const result = await Coordinate.create({
    address_id,
    lat: latDecimal,
    lng: lngDecimal,
  });

  return result;
};

module.exports = { createOrUpdateCoordinate };
