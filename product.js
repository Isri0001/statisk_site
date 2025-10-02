const productContainer = document.querySelector("#product-container");

const params =new URLSearchParams(window.location.search);
const id=params.get("id");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
.then((response)=>response.json())
.then(showProduct)
function showProduct(product) {
    productContainer.innerHTML=`  <main>
           <h1>Fashion<span class="red">R</span>Us</h1>
        <div class="breadcrumbs">
            <a href="index.html">Home</a>  
            <a href="index.html">Brands</a>  
            <a href="index.html">Nike</a>  
            Sahara Team India Fanwear Round Neck Jersey
          </div>
       
         <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="produkt billede"
    class="product-img">
    
    <div class="product-info">
<div class="info-left">
    <h2>Product information</h2>
    <p> <strong>Model name</strong> <br>${product.productdisplayname}</p>
    <p><strong>Color</strong> <br> ${product.basecolour}</p>
    <p><strong>Inventory number</strong> <br> 1163</p>
    <h2>Nike</h2>
    <p>Nike, creating experiences for today´s athlete</p>
</div>

<div class="info-right">
    <h2>${product.productdisplayname}</h2>
    <p>Nike | Tshirts</p>
    <p>Choose a size</p>
    <select name="size" id="">
        <option value="s">S</option>
        <option value="m">M</option>
        <option value="l">L</option>
    </select>
    <button>Add to basket</button>

</div>

</div>
  </main>`;
}



