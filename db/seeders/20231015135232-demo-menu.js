"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Menus",
      [
        {
          nama: "Sate",
          harga: 20000,
          hargaFormat: "Rp. 20.000",
          detail:
            "Makanan Yang Enak dan sangat membuat perut kenyang dan pasti sangat puas",
          alamatResto:
            "Jl. BSD Green Office Park Jl. BSD Grand Boulevard, Sampora, BSD, Kabupaten Tangerang, Banten 15345",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Dimsum",
          harga: 15000,
          hargaFormat: "Rp. 15.000",
          detail:
            "Makanan Yang Enak dan sangat membuat perut kenyang dan pasti sangat puas",
          alamatResto:
            "Jl. BSD Green Office Park Jl. BSD Grand Boulevard, Sampora, BSD, Kabupaten Tangerang, Banten 15345",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Ayam Goreng",
          harga: 28000,
          hargaFormat: "Rp. 28.000",
          detail:
            "Makanan Yang Enak dan sangat membuat perut kenyang dan pasti sangat puas",
          alamatResto:
            "Jl. BSD Green Office Park Jl. BSD Grand Boulevard, Sampora, BSD, Kabupaten Tangerang, Banten 15345",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Mie Goreng",
          harga: 12000,
          hargaFormat: "Rp. 12.000",
          detail:
            "Makanan Yang Enak dan sangat membuat perut kenyang dan pasti sangat puas",
          alamatResto:
            "Jl. BSD Green Office Park Jl. BSD Grand Boulevard, Sampora, BSD, Kabupaten Tangerang, Banten 15345",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Ayam Bakar",
          harga: 30000,
          hargaFormat: "Rp. 30.000",
          detail:
            "Makanan Yang Enak dan sangat membuat perut kenyang dan pasti sangat puas",
          alamatResto:
            "Jl. BSD Green Office Park Jl. BSD Grand Boulevard, Sampora, BSD, Kabupaten Tangerang, Banten 15345",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Mie Kuah",
          harga: 13000,
          hargaFormat: "Rp. 13.000",
          detail:
            "Makanan Yang Enak dan sangat membuat perut kenyang dan pasti sangat puas",
          alamatResto:
            "Jl. BSD Green Office Park Jl. BSD Grand Boulevard, Sampora, BSD, Kabupaten Tangerang, Banten 15345",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Nasi Goreng",
          harga: 16000,
          hargaFormat: "Rp. 16.000",
          detail:
            "Makanan Yang Enak dan sangat membuat perut kenyang dan pasti sangat puas",
          alamatResto:
            "Jl. BSD Green Office Park Jl. BSD Grand Boulevard, Sampora, BSD, Kabupaten Tangerang, Banten 15345",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Es Teh",
          harga: 5000,
          hargaFormat: "Rp. 5.000",
          detail:
            "Makanan Yang Enak dan sangat membuat perut kenyang dan pasti sangat puas",
          alamatResto:
            "Jl. BSD Green Office Park Jl. BSD Grand Boulevard, Sampora, BSD, Kabupaten Tangerang, Banten 15345",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Jus Apel",
          harga: 8000,
          hargaFormat: "Rp. 8.000",
          detail:
            "Makanan Yang Enak dan sangat membuat perut kenyang dan pasti sangat puas",
          alamatResto:
            "Jl. BSD Green Office Park Jl. BSD Grand Boulevard, Sampora, BSD, Kabupaten Tangerang, Banten 15345",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Ayam Geprek",
          harga: 15000,
          hargaFormat: "Rp. 15.000",
          detail:
            "Makanan Yang Enak dan sangat membuat perut kenyang dan pasti sangat puas",
          alamatResto:
            "Jl. BSD Green Office Park Jl. BSD Grand Boulevard, Sampora, BSD, Kabupaten Tangerang, Banten 15345",
          imageUrl:
            "https://ik.imagekit.io/6v306xm58/picture_M3bbSQX6w?updatedAt=1689391560279",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
