function loadProductDetail()
{
    const url = new URL(document.URL);
    const searchParams = url.searchParams;
    let id = searchParams.get("id");
    let product = getProductById(id);
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

function setTextName(product) 
{
    let productName  = document.getElementById("product-name");
    productName.innerText = product.ProductName;   
}

function getPriceFormat(price) {
    return parseInt(price).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
}

function setProductPrice(product)
{
     let originalPrice = getPriceFormat(product.OriginalPrice);
     let price = getPriceFormat(product.Price);
     let productOriginalPrice = document.getElementById("product-original-price");
     productOriginalPrice.innerText = originalPrice;
     let productPrice = document.getElementById("product-price");
     productPrice.innerText = price;
}

function getListProduct()
{
  let productString = localStorage.getItem("productData");
  return JSON.parse(productString);
}

function getProductById(id)
{
   let listProduct = getListProduct();
   return listProduct.find(item => item.Id == id);
}

function addToCart(id) 
{

}





