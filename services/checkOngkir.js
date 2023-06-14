const { Address, Courrier, Coordinate, User } = require("../models");
const { NotFoundError, BadRequestError } = require("../errors");
const { API_KEY_COST, EMAIL_ADMIN } = process.env;
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
  const lat1Float = parseFloat(lat1);
  const lon1Float = parseFloat(lon1);
  const lat2Float = parseFloat(lat2);
  const lon2Float = parseFloat(lon2);
  const dLat = toRadians(lat2Float - lat1Float);
  const dLon = toRadians(lon2Float - lon1Float);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1Float)) *
      Math.cos(toRadians(lat2Float)) *
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
  const { weight, courrier_id } = req.body;

  const checkCourrier = await Courrier.findOne({ where: { id: courrier_id } });
  if (!checkCourrier || checkCourrier.courrier !== "Internal Delivery") {
    throw new BadRequestError("Error kurrir!");
  }

  const getUser = await User.findOne({
    where: { email: user.email },
    include: [
      {
        model: Address,
        as: "address",
        include: [{ model: Coordinate, as: "coordinate" }],
      },
    ],
  });

  const getAdmin = await User.findOne({
    where: { email: EMAIL_ADMIN },
    include: [
      {
        model: Address,
        as: "address",
        include: [{ model: Coordinate, as: "coordinate" }],
      },
    ],
  });

  const result = calculateCodPrice(
    weight,
    getAdmin.address.coordinate.lat,
    getAdmin.address.coordinate.lng,
    getUser.address.coordinate.lat,
    getUser.address.coordinate.lng
  );

  return result;
};

module.exports = {
  checkOngkir,
  checkOngkirCod,
};
