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
    <tr >
            <td class= "table-product">${ordinalNumber}</td>
            <td class= "table-product">${cartProduct.ProductName}</td>
            <td class= "table-product"><a href="./productDetail.html?id=${cartProduct.Id}" target="_blank"><img class="image-table" src="../image/product-image/${cartProduct.Image}" alt="">    </a></td>
            <td class= "table-product">${cartProduct.Id}</td>
            <td class= "table-product">${productOriginalPrice} </td>
            <td class= "table-product">${productSalePrice}  </td>
            <td class= "table-product">
            <div class="quantity">
             <input class="minus" type="button" value="-" onclick = "getQuantityReduce(${cartProduct.Id})">
             <input class="product-quantity"type="text" id= "inputQuantity" value="${cartProduct.Quantity}">
             <input class="plus" type="button" value="+" onclick = "getQuantityIncrease()" >
            </div>
            </td>
            <td class= "table-product">${getPriceFormat(cartProduct.Price * cartProduct.Quantity)}</td>
            <td class= "table-product"><input class="delete-btn" type="button" value="Xóa Sản Phẩm" onclick="deleteProduct(${cartProduct.Id})"></td>
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
   
  let itemRender = 
`
<tr class= "table-product">
<th class= "table-product" colspan="8" >
Tổng Thành Tiền
</th>
<th  class= "table-product" style="background-color: rgba(255, 0, 0, 0.371);">
${sum}    
</th>
</tr>
`;

return itemRender;
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
   let sumRender = document.getElementById("table-total-price");
   sumRender.innerHTML = "";
   let itemRender = "";
  if(cartList.length > 0)
  {
   itemRender = rendTotalPrice();
   sumRender.innerHTML = itemRender;
  }

}

function deleteProduct(id)
{
   for(var i =0 ; i< cartList.length ; i++)
   {
       if(cartList[i].Id == id)
       {
        cartList.splice(i,1);
       }
   }
   saveCart();
   rendToCart();
}

function saveCart() {
   localStorage.setItem("cartItem", JSON.stringify(cartList));
}

function getQuantityInput() {
   let inputQuantity = parseInt(document.getElementById("inputQuantity").value);
   return inputQuantity;
 }

function getQuantityReduce(id)
{
   let inputQuantity = getQuantityInput();
   for(var i =0 ; i< cartList.length ; i++)
   {
      if(cartList[i].Id == id)
       {
        let quantity = cartList[i].Quantity - inputQuantity;
        if(quantity > 0)
        {
           cartList[i].Quantity = quantity;
        }
        if(quantity <= 0)
        {
         deleteProduct(id);
        }
       }
   }

   saveCart();
   rendToCart();
}
