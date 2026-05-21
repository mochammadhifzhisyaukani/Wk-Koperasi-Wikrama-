// Whatsapp Form Submission
const contactForm = document.getElementById("contact");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const telepon = document.getElementById("tel").value;
    const barang = document.getElementById("barang").value;
    const jumlah = document.getElementById("jumlah").value;

    if (!nama || !email || !telepon || !barang || !jumlah) {
      alert("Harap isi semua field sebelum submit!");
      return;
    }

    const nomorWA = "6289517354572";
    const teks = `Halo Masden mau pesen\n\nNama: ${nama}\nEmail: ${email}\nNomor Telephone: ${telepon}\nPesanan: ${barang}\n Jumlah : ${jumlah}`;
    const url = "https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(teks);

    window.open(url, "_blank");

    alert("Pesan Anda akan diarahkan ke WhatsApp 🚀");
    this.reset();
    alert("Pesanan telah di sampaikan");
  });
}
