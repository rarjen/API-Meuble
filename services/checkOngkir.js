const { Address, Courrier, Coordinate } = require("../models");
const { NotFoundError } = require("../errors");
const { API_KEY_COST } = process.env;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const costOngkir = async (origin, destination, weight, courrier) => {
  const url = "https://api.rajaongkir.com/starter/cost";
  const options = {
    method: "POST",
    headers: {
      key: API_KEY_COST,
      "X-RapidAPI-Host": "api.rajaongkir.com",
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      origin: origin.toString(),
      destination: destination.toString(),
      weight: parseInt(weight),
      courier: courrier.toLowerCase(),
    }),
  };

  const result = await fetch(url, options);
  const json = await result.json();
  return json.rajaongkir.results;
};

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateCodPrice(weight, lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius bumi dalam kilometer
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Math.round(R * c);

  const total = (distance * 500 + Math.round(weight / 1000) * 5000) / 2;

  return total;
}

const checkOngkir = async (req) => {
  const { weight, courrier_id } = req.body;
  const user = req.user;

  const checkCourrier = await Courrier.findOne({
    where: { id: courrier_id },
  });

  if (!checkCourrier) {
    throw new NotFoundError(`Tidak ada courrier dengan id: ${courrier_id}`);
  }

  const checkAddressAdmin = await Address.findOne({
    where: { user_id: 1 },
  });

  const checkAddress = await Address.findOne({ where: { user_id: user.id } });
  if (!checkAddress) {
    throw new NotFoundError(`Anda tidak memilki alamat!`);
  }

  const result = await costOngkir(
    checkAddressAdmin.city_id,
    checkAddress.city_id,
    weight,
    checkCourrier.courrier
  );

  return result;
};

const checkOngkirCod = async (req) => {
  const user = req.user;
  const { weight } = req.body;

  const checkCoordinateUser = await Coordinate.findOne({
    where: { address_id: user.address_id },
  });
  if (!checkCoordinateUser) {
    throw new NotFoundError(`Anda wajib memilih koordinat!`);
  }

  const checkCoordinateAdmin = await Coordinate.findOne({
    where: { address_id: 1 },
  });
  if (!checkCoordinateAdmin) {
    throw new NotFoundError(`Admin tidak memiliki coordinate`);
  }

  const result = calculateCodPrice(
    weight,
    checkCoordinateAdmin.lat,
    checkCoordinateAdmin.lng,
    checkCoordinateUser.lat,
    checkCoordinateUser.lng
  );

  return result;
};

module.exports = {
  checkOngkir,
  checkOngkirCod,
};
