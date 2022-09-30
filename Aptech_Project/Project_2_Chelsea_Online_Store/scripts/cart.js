let cartList = getCartProductArrayFromStorage();
function getCartProductArrayFromStorage()
{
  let productCart = localStorage.getItem("cartItem");
  if(productCart) return JSON.parse(productCart);
  return productCart;
}

function getPriceFormat(price)
{
   return  parseInt(price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}
let ordinalNumber = 1;
function rendCartProduct(cartProduct)
{
    let productOriginalPrice = getPriceFormat(cartProduct.OriginalPrice);
    let productSalePrice = getPriceFormat(cartProduct.Price); 
    
    let rendCartProduct = `
    <tr>
            <td>${ordinalNumber}</td>
            <td>${cartProduct.ProductName}</td>
            <td ><a href="./productDetail.html?id=${cartProduct.Id}" target="_blank"><img class="image-table" src="../image/product-image/${cartProduct.Image}" alt="">    </a></td>
            <td>${cartProduct.Id}</td>
            <td>${productOriginalPrice} </td>
            <td>${productSalePrice}  </td>
            <td>${cartProduct.Quantity} </td>
            <td>${getPriceFormat(cartProduct.Price * cartProduct.Quantity)}</td>
   </tr>`;
   ordinalNumber +=1 ;
   return rendCartProduct;
}

function getSum()
{
   let sum = 0;
  cartList.forEach(castProduct => {
    sum += castProduct.Price * castProduct.Quantity;
  });
   return sum;
}

function rendTotalPrice()
{
   let sum = getPriceFormat(getSum()); 
   let sumRender = document.getElementById("table-total-price");
  sumRender.innerHTML = "";
  let itemRender = "";
  itemRender = 
`
<tr>
<th colspan="7" >
Tổng Thành Tiền
</th>
<th style="background-color: rgba(255, 0, 0, 0.371);">
${sum}    
</th>
</tr>
`;

sumRender.innerHTML = itemRender;
}

function rendToCart()
{
   let render = document.getElementById("cart-items");
   render.innerHTML = "";
   let rendHTML = "";
   
   cartList.forEach(cartProduct => {
      let itemRender = rendCartProduct(cartProduct);
      rendHTML += itemRender;
 });

    render.innerHTML = rendHTML;
  
   rendTotalPrice();
  
}