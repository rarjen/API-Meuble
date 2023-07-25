"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Thumbnail_product_imgs",
      // [
      //   {
      //     product_id: 1,
      //     img_url: "https://ik.imagekit.io/6v306xm58/picture_aUldjsAyq",
      //     imagekit_id: "647765cd06370748f2d7dde9",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     product_id: 2,
      //     img_url: "https://ik.imagekit.io/6v306xm58/picture_aUldjsAyq",
      //     imagekit_id: "647765cd06370748f2d7dde9",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     product_id: 3,
      //     img_url: "https://ik.imagekit.io/6v306xm58/picture_aUldjsAyq",
      //     imagekit_id: "647765cd06370748f2d7dde9",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     product_id: 4,
      //     img_url: "https://ik.imagekit.io/6v306xm58/picture_aUldjsAyq",
      //     imagekit_id: "647765cd06370748f2d7dde9",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     product_id: 5,
      //     img_url: "https://ik.imagekit.io/6v306xm58/picture_aUldjsAyq",
      //     imagekit_id: "647765cd06370748f2d7dde9",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     product_id: 6,
      //     img_url: "https://ik.imagekit.io/6v306xm58/picture_aUldjsAyq",
      //     imagekit_id: "647765cd06370748f2d7dde9",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     product_id: 7,
      //     img_url: "https://ik.imagekit.io/6v306xm58/picture_aUldjsAyq",
      //     imagekit_id: "647765cd06370748f2d7dde9",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     product_id: 8,
      //     img_url: "https://ik.imagekit.io/6v306xm58/picture_aUldjsAyq",
      //     imagekit_id: "647765cd06370748f2d7dde9",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     product_id: 9,
      //     img_url: "https://ik.imagekit.io/6v306xm58/picture_aUldjsAyq",
      //     imagekit_id: "647765cd06370748f2d7dde9",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     product_id: 10,
      //     img_url: "https://ik.imagekit.io/6v306xm58/picture_aUldjsAyq",
      //     imagekit_id: "647765cd06370748f2d7dde9",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      // ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Thumbnail_product_imgs", null, {});
  },
};
