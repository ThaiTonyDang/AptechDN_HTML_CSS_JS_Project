var cartArray = [];

function loadData() {
  var strgData = `
    [
        {
            "Id": "1",
            "Name": "Mũi Hàn 500",
            "Price": 25000,
            "Quality":  1,
            "Image": "product_1.jpg"
        } ,
        {
            "Id": "2",
            "Name": "Trạm Hàn Hakko 942 75W Cực Nóng",
            "Price": 1299000,
            "Quality":  1,
            "Image": "product_2.jpg"
        } ,
        {
            "Id": "3",
            "Name": "Module DIY Sạc Không Dây Q",
            "Price": 89000,
            "Quality":  1,
            "Image": "product_3.jpg"
        } ,
        {
            "Id": "4",
            "Name": "Bộ Điều Chỉnh Điện Áp CHLVFU SDTY-200P",
            "Price": 2199000,
            "Quality":  1,
            "Image": "product_4.jpg"
        } ,
        {
            "Id": "5",
            "Name": "Module ISD1760",
            "Price": 115000,
            "Quality":  1,
            "Image": "product_5.jpg"
        },
        {
            "Id": "6",
            "Name": "Máy Bơm Chìm Hộ Gia Đình QDX 1500W",
            "Price": 1720000,
            "Quality":  1,
            "Image": "product_6.jpg"
        },
        {
            "Id": "7",
            "Name": "Module Nodemcu IOT ESP8266",
            "Price": 129000,
            "Quality": 1,
            "Image": "product_7.jpg"
        },
        {
            "Id": "8",
            "Name": "Raspberry Pi 3 E14 Model B Plus B+",
            "Price": 1400000,
            "Quality": 1,
            "Image": "product_8.jpg"
        }
    ]
    `;
  sessionStorage.setItem("stringList", strgData);
  return JSON.parse(strgData);
}

function getDataFromStorage() {
  var data = sessionStorage.getItem("stringList");
  if (data)
    return JSON.parse(data);
  return loadData();
}

function getRenderProductItem(product) {
  var priceFormat = parseInt(product.Price).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  let itemHtml = `
          <li class="main-product">
                  <div class="img-product">
                      <img class="img-prd"
                          src="./image/${product.Image}"
                          alt="">
                  </div>
                  <div class="content-product">
                      <h3 class="content-product-h3">${product.Name}</h3>
                      <div class="content-product-deltals">
                          <div class="price">
                              <span class="money">${priceFormat}</span>
                          </div>
                          <button type="button" class="btn btn-cart" 
                          onclick="addToCartAndCalculator(${product.Id})">ADD TO CART</button>
                      </div>
                  </div>
          </li>
      `;

  reRenderCartData(); // re-Draw table cart
  calcartQuality();

  return itemHtml;
}

function renderListProduct() {
  var productArray = getDataFromStorage();
  var render = document.getElementById("items");
  var itemHtml = "";
  productArray.forEach(product => {
    let productHtml = getRenderProductItem(product);
    itemHtml += productHtml;
  });
  
  render.innerHTML = itemHtml;
}

function addToCart(id) {
  var productArray = getDataFromStorage();
  // for (var i = 0; i < productArray.length; i++) {
  //   if (productArray[i].Id == id) { // tim product ton tai trong productArr
  //     let isProductExist = false;
  //     if (cartArray && cartArray.length > 0) {
  //       for (var j = 0; j < cartArray.length; j++) {
  //         if (cartArray[j].Id == id) { // tim product ton tai trong cart
  //           isProductExist = true;
  //           cartArray[j].Quality += 1;
  //         }
  //       }
  //     }
  //     if (!isProductExist) {
  //       cartArray.push(productArray[i]);
  //     }
  //   }
  // }

  var product = getProductById(productArray, id);

  if(product) {
    var productCart = getProductCartById(id);
    if(productCart) {
      productCart.Quality += 1; 
      return;
    }

    cartArray.push(product);
  }
  
}

function getProductById(productArr, id) {
  var product = productArr.find(item => item.Id == id);
  return product;
}

function getProductCartById(id) {
  var product = cartArray.find(item => item.Id == id);
  return product;
}

function calcartQuality() {
  hiddenVisibilityCart();
  var cartQuality = cartArray.length;
  document.getElementById("cart__item-number").innerText = cartQuality;
}

function inventoryRendingItem(cartItem) {
    var priceFormat = parseInt(cartItem.Price).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });

    var totalFormat = parseInt(cartItem.Price * cartItem.Quality);

    totalFormat = totalFormat.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });

    var productRender = ` 
       <tr style="text-align: center;vertical-align: center;">
           <td class = "product-id">${cartArray.indexOf(cartItem)+1}</td>
           <td class = "product-img"> 
           <img style = "width: 4rem; height: 4rem;" src="./image/${cartItem.Image}" alt="">
           <p>Id sản phẩm : ${cartItem.Id}</p> 
           </td>
           <td>${cartItem.Name}
           </td>
           <td >${priceFormat}</td>
           <td >${cartItem.Quality} </td>
           <td class= "total-price">${totalFormat}
           <button class="delete-button" onclick="removeProduct(${cartItem.Id})" > Xóa Sản Phẩm</button>
           </td> 
        </tr>   
      `;
    setCartDataToLocalStorage();
    return productRender;
}

function rendSumtoTable() {
  var sumHTML = document.getElementById("table-foot");
  sumHTML.innerHTML = ""; // Initial value is empty -- will return here when cleared

  if(cartArray.length > 0)
  {
    var sumHTML = document.getElementById("table-foot");
    sumHTML.innerHTML = "";
    var sum = sumTotal();
    var strgData = "";
    strgData = `
    <tr class ="total" >
          <td colspan="5" 
              style="font-weight: bold; text-align: center; background-color: yellow;" >
              Thành Tiền  
          </td>
          <td style=
              "font-weight: bold; text-align: center;background-color: red;">
              ${sum}
          </td>  
    </tr>
    `;
    sumHTML.innerHTML = strgData;
  }
}

function rendDataToInventory() {
  let render = document.getElementById("table-body");
  let productRender = "";
  
  cartArray.forEach(cartItem => {
    let rentProductHTML = inventoryRendingItem(cartItem);
    productRender += rentProductHTML;
  });
  render.innerHTML = productRender;
  rendSumtoTable();
}

function removeProduct(id) {
   for(var i =0 ; i< cartArray.length ; i++)
   {
       if(cartArray[i].Id == id)
       {
        cartArray.splice(i,1);
       }
   }
   setCartDataToLocalStorage();
   reRenderCartData();
   calcartQuality();
}

function sumTotal() {
  var sum = 0;
  for (var i = 0; i < cartArray.length; i++) {
    sum += parseInt(cartArray[i].Price * cartArray[i].Quality);
  }
  return sum.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

function setCartDataToLocalStorage() {
  var strgCartData = JSON.stringify(cartArray);
  localStorage.setItem("saveData", strgCartData);
}

function getCartData() {
  var getCartDataFromLocalStorage = localStorage.getItem("saveData");
  if (getCartDataFromLocalStorage != null) {
    cartArray = JSON.parse(getCartDataFromLocalStorage);
  }

  return cartArray;
}

function reRenderCartData() {
  cartArray = getCartData();
  rendDataToInventory();
}

function hiddenVisibilityCart() {
  if (cartArray.length <= 0) {
    document.getElementById("cart__item-number").style.opacity = "0";
    document.getElementById("cart__item-number").style.visibility = "hidden";
  } else {
    document.getElementById("cart__item-number").style.opacity = "1";
    document.getElementById("cart__item-number").style.visibility = "visible";
  }
}

function addToCartAndCalculator(id) {
  addToCart(id);
  calcartQuality();
  rendDataToInventory();
}
