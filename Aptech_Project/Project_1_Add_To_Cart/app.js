var cartArray = [];
function Data() {
  var strgData = `
    [
        {
            "Id": "1",
            "Name": "Mũi Hàn 500",
            "Price": "25000",
            "Count":  1,
            "Image": "product_1.jpg"
        } ,
        {
            "Id": "2",
            "Name": "Trạm Hàn Hakko 942 75W Cực Nóng",
            "Price": "1299000",
            "Count":  1,
            "Image": "product_2.jpg"
        } ,
        {
            "Id": "3",
            "Name": "Module DIY Sạc Không Dây Q",
            "Price": "89000 đ",
            "Count":  1,
            "Image": "product_3.jpg"
        } ,
        {
            "Id": "4",
            "Name": "Bộ Điều Chỉnh Điện Áp CHLVFU SDTY-200P",
            "Price": "2199000 đ",
            "Count":  1,
            "Image": "product_4.jpg"
        } ,
        {
            "Id": "5",
            "Name": "Module ISD1760",
            "Price": "115000 đ",
            "Count":  1,
            "Image": "product_5.jpg"
        },
        {
            "Id": "6",
            "Name": "Máy Bơm Chìm Hộ Gia Đình QDX 1500W",
            "Price": "1720000 đ",
            "Count":  1,
            "Image": "product_6.jpg"
        },
        {
            "Id": "7",
            "Name": "Module Nodemcu IOT ESP8266",
            "Price": "129000 đ",
            "Count": 1,
            "Image": "product_7.jpg"
        },
        {
            "Id": "8",
            "Name": "Raspberry Pi 3 E14 Model B Plus B+",
            "Price": "1400000 đ",
            "Count": 1,
            "Image": "product_8.jpg"
        }
    ]
    `;
  sessionStorage.setItem("stringList", strgData);
  return JSON.parse(strgData);
}

function dataLoading() {
  var productArray = [];
  var getDataFromStorage = sessionStorage.getItem("stringList");
  if (getDataFromStorage != null) {
    productArray = JSON.parse(getDataFromStorage);
  } else {
    productArray = Data();
  }

  return productArray;
}

function renderData() {
  var productArray = dataLoading();
  var render = document.getElementById("items");
  render.innerHTML = "";
  var itemHtml = "";
  for (var i = 0; i < productArray.length; i++) {
    itemHtml += `
            <li class="main-product">
                    <div class="img-product">
                        <img class="img-prd"
                            src="./image/${productArray[i].Image}"
                            alt="">
                    </div>
                    <div class="content-product">
                        <h3 class="content-product-h3">${productArray[i].Name}</h3>
                        <div class="content-product-deltals">
                            <div class="price">
                                <span class="money">${productArray[i].Price}</span>
                            </div>
                            <button type="button" class="btn btn-cart" onclick="addToCartAndCalculator(${productArray[i].Id})">ADD TO CART</button>
                        </div>
                    </div>
            </li>
        `;
  }
  render.innerHTML = itemHtml;
}

function addToCart(id) {
  var productArray = dataLoading();

  for (var i = 0; i < productArray.length; i++) {
    if (productArray[i].Id == id) {
      let isProductExist = false;
      if (cartArray && cartArray.length > 0) {
        for (var j = 0; j < cartArray.length; j++) {
          if (cartArray[j].Id == id) {
            isProductExist = true;
            productArray[j].Count += 1;
          }
        }
      }
      if (!isProductExist) {
        cartArray.push(productArray[i]);
      }
    }
  }

  console.log(cartArray);
}

function calcartQuality() {
  var cartQuality = cartArray.length;
  document.getElementById("cart__item-number").innerText = cartQuality;
}

function addToCartAndCalculator(id) {
  addToCart(id);
  calcartQuality();
}
