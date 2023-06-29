const {
  User,
  Category,
  Courrier,
  Payment,
  Size,
  Material,
  Transaction_custom_order,
} = require("../models");
const { CUSTOM_ORDER } = require("../utils/enum");

const getTotalCustom = async () => {
  const result = await Transaction_custom_order.findAll({
    where: { statusOrder: CUSTOM_ORDER.DONE },

    include: [
      {
        model: User,
        as: "user",
        attributes: ["email", "first_name", "last_name"],
      },
      {
        model: Category,
        as: "category",
        attributes: { exclude: ["createdAt", "updatedAt", "status"] },
      },
      {
        model: Courrier,
        as: "courrier",
        attributes: ["courrier"],
      },
      {
        model: Payment,
        as: "payment",
        attributes: ["payment", "rekening"],
      },
      {
        model: Size,
        as: "size",
        attributes: { exclude: ["createdAt", "updatedAt", "status"] },
      },
      {
        model: Material,
        as: "material",
        attributes: { exclude: ["createdAt", "updatedAt", "status"] },
      },
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  // let string = JSON.stringify(result);
  // let data = JSON.parse(string);

  // let total = 0;

  // data.forEach((element) => {
  //   total += element.total;
  // });

  return result;
};

module.exports = { getTotalCustom };
