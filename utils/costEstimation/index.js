let muchMaterial = 0;
const estimation = async (
  panjangMebel,
  lebarMebel,
  tinggiMebel,
  panjangMaterial,
  lebarMaterial,
  ketebalanMaterial,
  hargaPerBalok,
  berat
) => {
  const volumeMaterial =
    (panjangMebel * lebarMebel * tinggiMebel) /
    (panjangMaterial * lebarMaterial * ketebalanMaterial);

  // Hitung jumlah material yang dibutuhkan
  const jumlahMaterial = Math.ceil(volumeMaterial); // Bulatkan ke atas
  muchMaterial = jumlahMaterial;
  // Hitung estimasi harga
  const estimasiHarga = jumlahMaterial * hargaPerBalok;

  const weight = muchMaterial * berat < 1000 ? 1000 : muchMaterial * berat;

  return { estimasiHarga, weight };
};

module.exports = estimation;
