
function getIdFromDetailPage() {
  const url = new URL(document.URL);
  const searchParams = url.searchParams;
  return searchParams.get("id");

}

function loadProductDetail() {
  let id = getIdFromDetailPage();
  let product = getProductById(id);
  let cart = getCartFromStorage(); 
  getCartNumber(cart);
  setImage(product);
  setTextName(product);
  setProductPrice(product);
  setId(product);
}

function setId(product) {
  let id = document.getElementById("product-id");
  id.innerText = `Mã Sản Phẩm: Chelsea-00${product.Id}`;
}

function setImage(product) {
  let image = document.getElementById("product-image");
  image.src = `../image/product-image/${product.Image}`;
}

function setTextName(product) {
  let productName = document.getElementById("product-name");
  productName.innerText = product.ProductName;
}

function getPriceFormat(price) {
  return parseInt(price).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

function setProductPrice(product) {
  let originalPrice = getPriceFormat(product.OriginalPrice);
  let price = getPriceFormat(product.Price);
  let productOriginalPrice = document.getElementById("product-original-price");
  productOriginalPrice.innerText = originalPrice;
  let productPrice = document.getElementById("product-price");
  productPrice.innerText = price;
}

function getListProduct() {
  let productString = localStorage.getItem("productData");
  return JSON.parse(productString);
}

function getProductById(id) {
  let listProduct = getListProduct();
  return listProduct.find((item) => item.Id == id);
}


function getQuantityInput() {
  let inputQuantity = parseInt(document.getElementById("inputQuantity").value);
  return inputQuantity;
}

function pushProductToCart(cart) {
  let inputQuantity = getQuantityInput();
  let id = getIdFromDetailPage();
  let product = getProductById(id);

  if (product) {
    let productCart = getProductCartById(cart, id);
    if (productCart) {
      productCart.Quantity = productCart.Quantity + inputQuantity;
      return;
    }

    product.Quantity = inputQuantity;
    cart.push(product);
  }
}


function addProductToCart() {
  let cart = getCartFromStorage();
  pushProductToCart(cart);
  
  saveCart(cart);
}

function saveCart(cart) {
  localStorage.setItem("cartItem", JSON.stringify(cart));
}

function getProductCartById(cart, id) {
  let product = cart.find((item) => item.Id == id);
  return product;
}

function getCartFromStorage() {
  let cart = localStorage.getItem("cartItem");
  if (cart) return JSON.parse(cart);
  return [];
}

function hiddenVisibleCartNumber() {
  let cart = getCartFromStorage(); 
  if (cart) {
    document.getElementById("cart__item-number").style.opacity = "1";
    document.getElementById("cart__item-number").style.visibility = "visible";
  } else {
    document.getElementById("cart__item-number").style.opacity = "0";
    document.getElementById("cart__item-number").style.visibility = "hidden";
  }
}

function getCartNumber(cart) {
  hiddenVisibleCartNumber();
  let result = document.getElementById("cart__item-number");
  result.innerText = "";
  if (cart) {
    result.innerText = parseInt(cart.length);
  }
}

function rendDisplayTable(productCart) {
  let price = getPriceFormat(productCart.Price);
  let rendTable = `<tr>
                    <td>${productCart.ProductName}</td>
                    <td><img class = "display-image" src="../image/product-image/${productCart.Image}" alt=""></td>
                    <td>${productCart.Quantity}</td>
                    <td>${price}</td>
                   </tr> 
                `;
  return rendTable;              
}

function displayProductTable() {
   let cart = getCartFromStorage();
   let bodyTable = document.getElementById("table-product-rending");
   bodyTable.innerHTML = "";
   let render = "";
   cart.forEach((productCart) => {
    let itemRender = rendDisplayTable(productCart);
    render += itemRender;
   });

   bodyTable.innerHTML = render;
}