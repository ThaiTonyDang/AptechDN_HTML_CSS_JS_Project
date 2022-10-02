let cartList = getCartProductArrayFromStorage();

function getCartProductArrayFromStorage() {
  let productCart = localStorage.getItem("cartItem");
  if (productCart) return JSON.parse(productCart);
  return productCart;
}

function getPriceFormat(price) {
  return parseInt(price).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}
function rendCartProduct(cartProduct) {
  let productOriginalPrice = getPriceFormat(cartProduct.OriginalPrice);
  let productSalePrice = getPriceFormat(cartProduct.Price);

  let rendCartProduct = `
    <tr >
            <td class= "table-product">${cartList.indexOf(cartProduct) + 1}</td>
            <td class= "table-product">${cartProduct.ProductName}</td>
            <td class= "table-product"><a href="./productDetail.html?id=${
              cartProduct.Id
            }" target="_blank">
            <img class="image-table" src="../image/product-image/${
              cartProduct.Image
            }" alt="">    </a></td>
            <td class= "table-product">${cartProduct.Id}</td>
            <td class= "table-product">${productOriginalPrice} </td>
            <td class= "table-product">${productSalePrice}  </td>
            <td class= "table-product quantity-tab">
            <div class="quantity">
             <button class="quantity-btn" id="minus" type="button" data-value="${
               cartProduct.Id
             }" value="${OPERATOR_BUTTON.Minus}" 
             ><i class="bi bi-dash-circle"></i></button> 
             <input class="product-quantity"type="text" id= "inputQuantity" value="${
               cartProduct.Quantity
             }">
             <button class="quantity-btn" id="btn" type="button" data-value="${
               cartProduct.Id
             }" value="${OPERATOR_BUTTON.Plus}" 
             ><i class="bi bi-plus-circle"></i></button>
            </div>
            
            </td>
            <td class= "table-product">${getPriceFormat(
              cartProduct.Price * cartProduct.Quantity
            )}</td>
            <td class= "table-product">
            <button class="delete-btn" type="button" data-value="${
              cartProduct.Id
            }"
             value="${OPERATOR_BUTTON.Delete}" >
            <i class="bi bi-trash-fill"></i>
            Xóa Sản Phẩm
            <span class="span firt"></span>
            <span class="span second"></span>
            <span class="span third"></span>
            <span class="span fourth"></span>
            </button>
            </td>
   </tr>`;

  return rendCartProduct;
}

function getSum() {
  let sum = 0;
  cartList.forEach((castProduct) => {
    sum += castProduct.Price * castProduct.Quantity;
  });
  return sum;
}

function rendTotalPrice() {
  let sum = getPriceFormat(getSum());

  let itemRender = `
<tr class= "table-product">
<th class= "table-product" colspan="7" >
Tổng Thành Tiền
</th>
<th  class= "table-product" colspan="2"  style="background-color: rgba(255, 0, 0, 0.371);">
${sum}    
</th>
</tr>
`;

  return itemRender;
}

function rendTotalProductNumber() {
  let rendHTML = "";
  if (cartList.length > 0) {
    rendHTML = `
  <th class="th-product" colspan="9" style="background-color: #001489;">
            Có tất cả <span>${cartList.length}</span> sản phẩm trong giỏ hàng</th>
  `;
  } else {
    rendHTML = `
  <th class="th-product" colspan="9" style="background-color: #001489;">
            Không có sản phẩm nào trong giỏ hàng</th>
  `;
  }

  return rendHTML;
}

function rendToCart() {
  // rend table head
  let headRender = document.getElementById("total-product-number");
  headRender.innerHTML = "";
  let renderItem = "";
  renderItem = rendTotalProductNumber();
  headRender.innerHTML = renderItem;

  // rend table body : product in cart
  let bodyRender = document.getElementById("cart-items");
  bodyRender.innerHTML = "";
  let rendHTML = "";

  cartList.forEach((cartProduct) => {
    let itemRender = rendCartProduct(cartProduct);
    rendHTML += itemRender;
  });
  bodyRender.innerHTML = rendHTML;

  // rend table foot
  let footRender = document.getElementById("table-total-price");
  footRender.innerHTML = "";
  let itemRender = "";
  if (cartList.length > 0) {
    itemRender = rendTotalPrice();
    footRender.innerHTML = itemRender;
  }

  bindingClick(); // find all the buttons and then set the clicks event
}

function deleteProduct(id) {
  cartList.forEach((item, index) => {
    if (item.Id == id) cartList.splice(index, 1);
  });
}

function saveCart() {
  localStorage.setItem("cartItem", JSON.stringify(cartList));
}

function getProductCartById(id) {
  let product = cartList.find((item) => item.Id == id);
  return product;
}

function bindingClick() {
  let buttons = document.querySelectorAll("button"); // select all buttons
  for (item of buttons) {
    item.addEventListener("click", function () {
      let id = this.getAttribute("data-value");
      let value = this.getAttribute("value");
      let product = getProductCartById(id);

      product.Quantity = getQuantityAdjustment(product, value); // Tăng giảm số lượng

      getConfirmQuatity(product, id); // Xác nhận xóa khi giảm hết Sản Phẩm

      getRemoveProduct(id, value); // Xóa Sản Phẩm

      saveCart(id); // Save data vào giỏ hàng
      rendToCart();
    });
  }
}

function getQuantityAdjustment(product, value) {
  if (product) {
    if (value == OPERATOR_BUTTON.Minus) {
      product.Quantity = product.Quantity - 1;
    }
    if (value == OPERATOR_BUTTON.Plus) {
      product.Quantity += 1;
    }
  }
  return product.Quantity;
}

function getRemoveProduct(id, value) {
  if (value == OPERATOR_BUTTON.Delete) {
    deleteProduct(id);
  }
}

function getConfirmQuatity(product, id) {
  if (product.Quantity < 1) {
    if (confirm("Bạn Muốn Xóa Sản Phẩm Này")) {
      deleteProduct(id);
    } else {
      product.Quantity = 1;
    }
  }
}
