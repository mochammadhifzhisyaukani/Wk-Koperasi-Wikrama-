// DATA PRODUK (8 ATK)
const dataProduk = [
  {
    id: 1,
    name: "Pulpen",
    price: 5000,
    img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/89/MTA-132145415/zuixua_zuixua_pulpen_gel_-_pen_gel_new_jell_pulpen_0-4mm_isi_12_warna_hitam_full10_tpqn08nc.jpg",
  },
  {
    id: 2,
    name: "Pensil",
    price: 2000,
    img: "https://cdn.ruparupa.io/fit-in/400x400/filters:format(webp)/filters:quality(90)/ruparupa-com/image/upload/Products/10586156_1.jpg",
  },
  {
    id: 3,
    name: "Penghapus",
    price: 1000,
    img: "https://image.astronauts.cloud/product-images/2024/4/JoykoPenghapus526B40BLPutih1pcs1_d1d64a76-3a99-4418-bca8-b659bae8c248_900x900.jpeg",
  },
  {
    id: 4,
    name: "Tip-X Kertas",
    price: 8500,
    img: "https://jabar.parto.id/asset/foto_produk/x_jpg_170917364149.jpg",
  },
  {
    id: 5,
    name: "Penggaris",
    price: 4000,
    img: "https://siplah.blibli.com/data/images/SCNS-0020-00248/3778e23c-4d3f-438e-95f9-9f547491c7fe.jpg",
  },
  {
    id: 6,
    name: "Buku Bigboss",
    price: 5000,
    img: "https://media.monotaro.id/mid01/big/Kebutuhan%20Kantor/Produk%20Kantor/Notes%2C%20Produk%20Kertas/Buku/Big%20BOSS%20Buku%20Tulis/15P105656041-2.jpg",
  },
  {
    id: 7,
    name: "Notebook",
    price: 15000,
    img: "https://down-id.img.susercontent.com/file/1ca22c4ff2b97b0dd065e98885b898f8",
  },
  {
    id: 8,
    name: "Spidol",
    price: 7000,
    img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-62737363/snowman_spidol_permanen_warna_hitam_spidol_snowman_marker_g-12_round_tip_full01_ql54xjrn.jpg",
  },
];

let cart = [];

// RENDER PRODUK SECARA OTOMATIS
const productsContainer = document.getElementById("products-container");
function renderProducts() {
  productsContainer.innerHTML = "";
  dataProduk.forEach((prod) => {
    productsContainer.innerHTML += `
      <div class="card" data-id="${prod.id}">
        <img loading="lazy" src="${prod.img}" alt="${prod.name}">
        <h3>${prod.name}</h3>
        <p class="price">Rp ${prod.price.toLocaleString("id-ID")}</p>
        
        <!-- Tombol Keranjang -->
        <button class="add-cart" onclick="addToCart(${prod.id})">
          Tambah ke Keranjang
        </button>
        
        <!-- Tombol Pesan dengan query string -->
        <button class="add-cart mt-3" onclick="window.location.href='contact.html?id=${prod.id}'">
          Pesan
        </button>
      </div>
    `;
  });
}

// TAMBAH KE KERANJANG & POPUP
function addToCart(id) {
  const produk = dataProduk.find((p) => p.id === id);
  const isiKeranjang = cart.find((item) => item.id === id);

  if (isiKeranjang) {
    isiKeranjang.quantity++;
  } else {
    cart.push({ ...produk, quantity: 1 });
  }

  updateCartCount();
  showPopup();
}

function updateCartCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalItems;
}

function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

// MODAL CHECKOUT SYSTEM
const cartBtn = document.getElementById("cart-btn");
const checkoutModal = document.getElementById("checkout-modal");
const closeModal = document.getElementById("close-modal");
const checkoutItems = document.getElementById("checkout-items");
const totalPriceEl = document.getElementById("total-price");

cartBtn.addEventListener("click", () => {
  checkoutModal.classList.add("active");
  renderCheckout();
});

closeModal.addEventListener("click", () => {
  checkoutModal.classList.remove("active");
});

function renderCheckout() {
  checkoutItems.innerHTML = "";
  let totalBelanja = 0;

  if (cart.length === 0) {
    checkoutItems.innerHTML = `<p style="text-align:center; color:#7f8c8d;">Keranjang belanja kamu kosong.</p>`;
    totalPriceEl.innerText = "Rp 0";
    return;
  }

  cart.forEach((item) => {
    const subTotal = item.price * item.quantity;
    totalBelanja += subTotal;
    checkoutItems.innerHTML += `
      <div class="checkout-item">
        <div>
          <h4>${item.name}</h4>
          <small>Rp ${item.price.toLocaleString("id-ID")} x ${item.quantity}</small>
        </div>
        <span class="subtotal">Rp ${subTotal.toLocaleString("id-ID")}</span>
      </div>
    `;
  });

  totalPriceEl.innerText = `Rp ${totalBelanja.toLocaleString("id-ID")}`;
}

// SCROLL TO PRODUCT (HERO BUTTON)
document.getElementById("shop-btn").addEventListener("click", () => {
  document.getElementById("produk").scrollIntoView({
    behavior: "smooth",
  });
});

// INITIALIZE & ANIMASI SCROLL
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  });

  const checkScroll = () => {
    const cardsToAnimate = document.querySelectorAll(".card");
    cardsToAnimate.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < window.innerHeight - 100) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  };

  window.addEventListener("scroll", checkScroll);
  setTimeout(checkScroll, 100); // Trigger sekali di awal beban halaman
});
