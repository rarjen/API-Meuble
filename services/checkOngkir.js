const { Address, Courrier } = require("../models");
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

const checkOngkir = async (req) => {
  const { weight, courrier_id } = req.body;
  const user = req.user;

  const checkCourrier = await Courrier.findOne({
    where: { id: courrier_id },
  });

  console.log(checkCourrier.courrier);

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

module.exports = {
  checkOngkir,
};
