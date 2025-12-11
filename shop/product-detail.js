const products = [
  {
    id: 1,
    name: "Áo thun nam",
    price: "250.000đ",
    img: "../shop/image/ao thun .jpg",
    desc: "Áo thun cotton 100% thoáng mát.",
  },
  {
    id: 2,
    name: "Hoodie anh bộ bê cê",
    price: "350.000đ",
    img: "../shop/image/hodie bộ pc.jpg",
    desc: "Hoodie form rộng, phong cách đường phố.",
  },
  {
    id: 3,
    name: "Quần jeans nữ",
    price: "400.000đ",
    img: "../shop/image/jean nữ.jpg",
    desc: "Quần jeans ôm dáng, co giãn nhẹ.",
  },
  {
    id: 4,
    name: "Áo sơ mi trắng",
    price: "280.000đ",
    img: "../shop/image/sơ mi trắng.jpg",
    desc: "Áo sơ mi cổ điển, dễ phối đồ.",
  },
  {
    id: 5,
    name: "Áo khoác jeans",
    price: "480.000đ",
    img: "../shop/image/jean jacket.jpg",
    desc: "Áo khoác jeans trẻ trung, dễ phối.",
  },
  {
    id: 6,
    name: "Quần short nam",
    price: "220.000đ",
    img: "../shop/image/short.jpg",
    desc: "Quần short kaki thoáng mát.",
  },
  {
    id: 7,
    name: "Áo khoác da",
    price: "650.000đ",
    img: "../shop/image/leather jacket.jpg",
    desc: "Áo khoác da cao cấp, sang trọng.",
  },
  {
    id: 8,
    name: "Chân váy dài",
    price: "320.000đ",
    img: "../shop/image/long skirt.jpg",
    desc: "Chân váy mềm, nữ tính.",
  },
  {
    id: 9,
    name: "Áo sweater",
    price: "300.000đ",
    img: "/shop/image/sweater.jpg",
    desc: "Áo sweater unisex, giữ ấm tốt.",
  },
  {
    id: 10,
    name: "Váy công sở",
    price: "420.000đ",
    img: "/shop/image/office dress.jpg",
    desc: "Váy công sở thanh lịch, tôn dáng.",
  },
  {
    id: 11,
    name: "Áo hoodie",
    price: "380.000đ",
    img: "/shop/image/hoodie.jpg",
    desc: "Áo hoodie cotton mềm, form rộng.",
  },
  {
    id: 12,
    name: "Quần tây nam",
    price: "350.000đ",
    img: "/shop/image/touser.jpg",
    desc: "Quần tây công sở, vải mịn.",
  },
  {
    id: 13,
    name: "Áo croptop",
    price: "290.000đ",
    img: "/shop/image/croptop.jpg",
    desc: "Áo croptop năng động, trẻ trung.",
  },
  {
    id: 14,
    name: "Quần jeans nam",
    price: "450.000đ",
    img: "/shop/image/men's jean.jpg",
    desc: "Quần jeans nam form slim, co giãn nhẹ.",
  },
  {
    id: 15,
    name: "Đầm dạ hội",
    price: "720.000đ",
    img: "/shop/image/evening dress.jpg",
    desc: "Đầm dạ hội cao cấp, sang trọng.",
  },
  {
    id: 16,
    name: "Áo len nữ",
    price: "330.000đ",
    img: "/shop/image/woman's sweater.jpg",
    desc: "Áo len mềm, phong cách vintage.",
  },
];

function addToCart(product, size = "Size M", quantity = 1) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(
    (item) => item.id === product.id && item.size === size
  );
  if (existing) existing.quantity += quantity;
  else cart.push({ ...product, size, quantity });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Đã thêm vào giỏ hàng!");
}

if (document.getElementById("product-image")) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = products.find((p) => p.id === productId);

  if (product) {
    document.getElementById("product-image").src = product.img;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-desc").textContent = product.desc;
  }

  document.querySelector(".btn-success").addEventListener("click", () => {
    const size = document.querySelector("select").value;
    const quantity = parseInt(
      document.querySelector("input[type='number']").value
    );
    addToCart(product, size, quantity);
  });
}
const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {
  const addBtn = card.querySelector("button.btn-success");
  addBtn.addEventListener("click", () => {
    addToCart(products[index]);
  });
});

if (document.getElementById("cart-items")) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total-price");

  function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML =
        "<tr><td colspan='6' class='text-center'>Giỏ hàng trống!</td></tr>";
      totalElement.textContent = "0đ";
      return;
    }

    cart.forEach((item, index) => {
      const priceNum = parseInt(item.price.replace(/\D/g, ""));
      total += priceNum * item.quantity;

      cartContainer.innerHTML += `
        <tr>
          <td><img src="${item.img}" alt="${item.name}" width="70"></td>
          <td>${item.name}</td>
          <td>${item.size || "-"}</td>
          <td>${item.price}</td>
          <td>
            <input type="number" min="1" value="${item.quantity}"
              class="form-control w-50 mx-auto"
              onchange="updateQuantity(${index}, this.value)">
          </td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
              Xóa
            </button>
          </td>
        </tr>
      `;
    });

    totalElement.textContent = total.toLocaleString("vi-VN") + "đ";
  }

  window.updateQuantity = (index, newQty) => {
    cart[index].quantity = parseInt(newQty);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  window.removeItem = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  window.clearCart = () => {
    if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  };

  renderCart();
}
