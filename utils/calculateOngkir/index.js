const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const calculateCodPrice = async (weight, lat1, lon1, lat2, lon2) => {
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
};

module.exports = calculateCodPrice;
