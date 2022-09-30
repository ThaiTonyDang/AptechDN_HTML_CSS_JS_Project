fetch("../data/dataListArray.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    pushDataIntoLocalStorage(data);
  });

function pushDataIntoLocalStorage(data) {
  localStorage.setItem("productData", JSON.stringify(data));
  return data;
}

function getDataFromSessionStorage() {
  let dataArray = localStorage.getItem("productData");
  if (dataArray) return JSON.parse(dataArray);
  return pushDataIntoSessionStorage(dataArray);
}

function getFiveStar(descript) {
  let renderStar = "";
  if (descript == 1 || descript == 3) {
    renderStar = `
        <div class="bi-star-fill"></div>
        <div class="bi-star-fill"></div>
        <div class="bi-star-fill"></div>
        <div class="bi-star-fill"></div>
        <div class="bi-star-fill"></div>`;
  }
  return renderStar;
}

function getPriceFormat(price) {
  return parseInt(price).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

function getProductType(type) {
  switch (type) {
    case PRODUCT_TYPE.News:
      return PRODUCT_DESCRIPTION.News;
    case PRODUCT_TYPE.Special:
      return PRODUCT_DESCRIPTION.Special;
    case PRODUCT_TYPE.Sale:
      return PRODUCT_DESCRIPTION.Sale;
    default:
      return PRODUCT_DESCRIPTION.Normal;
  }
}

function rendProduct(product) {
  let render = `
    <div class="col mb-5">
            <div class="card h-100">
             
              <div
                class="badge bg-dark text-white position-absolute"
                id="sale"
                style="top: 0.5rem; right: 0.5rem">
                Sale
              </div>
              
              <a href="./productDetail.html?id=${product.Id}" target="_blank">
                <img
                  style="height: 300px;"
                  class="card-img-top img-fluid"
                  src="../image/product-image/${product.Image}"
                  alt="..."
                />
              </a>
              
              
              <div class="card-body p-4">
                <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder product-type">${getProductType(
                    product.Type
                  )}</h5>
                  <h6 class="name" >${product.ProductName}</h6>
                
                  <div class="d-flex justify-content-center small text-warning mb-2" id="five-star">
                    ${getFiveStar(product.Type)}
                  </div>

                  <span class="text-muted text-decoration-line-through"
                    >${getPriceFormat(product.OriginalPrice)} </span>
                    ${getPriceFormat(product.Price)}
                </div>
              </div>
              <!-- Product actions-->
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <button class="btn btn-outline-dark mt-auto" href="#"
                  onclick="addToCart(${product.Id})"
                    >Add To Cart</button>
                </div>
              </div>
            </div>
      </div>`;
  return render;
}

function loadDataProductToHTML() {
  let productArray = getDataFromSessionStorage();
  let renderPlace = document.getElementById("list-product");
  renderPlace.innerHTML = "";
  let rendHTML = "";
  productArray.forEach((product) => {
    let render = rendProduct(product);
    rendHTML += render;
  });

  renderPlace.innerHTML = rendHTML;
  cartArray = getDataCartFromStorage();
  getCartNumber();
}

let cartArray = [];
function getDataCartFromStorage() {
  cartArray = localStorage.getItem("cartItem");
  if (cartArray) return JSON.parse(cartArray);
  return cartArray;
}
function getProductById(productArray, id) {
  let product = productArray.find((item) => item.Id == id);
  return product;
}

function getProductCartById(id) {
  cartArray = getDataCartFromStorage();
  if (cartArray) {
    let productCart = cartArray.find((item) => item.Id == id);
    return productCart;
  }
}

function addProductToCart(id) {
  let productArray = getDataFromSessionStorage();
  let product = getProductById(productArray, id);
  if (product) {
    let productCart = getProductCartById(id);
    if (productCart) {
      productCart.Quantity += 1;
      return;
    }

    if (cartArray==null) {
      cartArray = [];
    }
    
    cartArray.push(product);
    
  }
}

function saveCart() {
  localStorage.setItem("cartItem", JSON.stringify(cartArray));
}

function hiddenVisibleCartNumber() {
  cartArray = getDataCartFromStorage();
  if (cartArray && cartArray.length > 0) {
    document.getElementById("cart__item-number").style.opacity = "1";
    document.getElementById("cart__item-number").style.visibility = "visible";
  } else {
    document.getElementById("cart__item-number").style.opacity = "0";
    document.getElementById("cart__item-number").style.visibility = "hidden";
  }
}

function getCartNumber() {
  hiddenVisibleCartNumber();
  let result = document.getElementById("cart__item-number");
  result.innerText = "";
  if (cartArray) {
    result.innerText = parseInt(cartArray.length);
  }
}

function addToCart(id) {
  addProductToCart(id);
  saveCart();
  getCartNumber();
}
