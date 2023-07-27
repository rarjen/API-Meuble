const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `${timestamp}${randomDigits}`;
};

module.exports = generateInvoiceNumber;
