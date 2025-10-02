// const productlistContainer = document.querySelector("product");

// const params =new URLSearchParams(window.location.search);
// const id=params.get("id");

// fetch(`https://kea-alt-del.dk/t7/api/products`)
// .then((response)=>response.json())
// .then((product)=>{
//     productContainer.innerHTML=``;
// })

// const productContainer = document.querySelector("main");

// fetch(`https://kea-alt-del.dk/t7/api/products`)
// .then((response) => response.json())
// .then(showProducts) 
    
//     function showProducts(data) {
//         console.log(data);
//         let markup = "";
//         data.forEach(product => {
//             markup += `      <main class="products">
//          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="tøj">
//          <p><strong>${product.productdisplayname}</strong></p>
//          <p>${product.articletype} | ${product.brandname}</p>
//         <div class="sale">
//          <p>Prev. DKK <span>${product.price}</span>,-<br>Now DKK ${Math.round(product.price - product.price * product.discount / 100)},-</p>
//          <p class="saleRed">${product.discount}</p>
//         </div>
//          <a href="produkt.html?id=${product.id}">Read More</a>
//       </div>`
//         });


// productContainer.innerHTML += markup;
// }


// Jeg henter category fra URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// Finder container 
const productlistContainer = document.querySelector("#products") || document.querySelector("main");

// // filter knapper:
// document.querySelector("#filters button").forEach(knap=>knap.addEventListener("click, showFiltered"));
// function showFiltered(){
    
// }

// Her laver jeg grid, hvis der ikke er grid på .products i forvejen
let grid = document.querySelector("#products") || document.querySelector(".products");
if (!grid) {
  grid = document.createElement("section");
  grid.className = "products";
  grid.id = "products";
  productlistContainer.appendChild(grid);
}

// function showFiltered(){
//     console.log(this.dataset.gender);
//     const gender = this.dataset.gender;
//     if(gender=="All"){
//         showProducts(allData);}else{
//             const udsnit = allData.filter(product =>product.gender==gender);
//             showProducts(udsnit);
//         }
//     }

// let allData;

fetch("https://kea-alt-del.dk/t7/api/products?limit=30")
  .then((response) => response.json())
  .then((data) => showProducts(data))
  .catch((err) => console.error("Fejl i fetch:", err));

function showProducts(products) {
  // Filtrér på category hvis der er en i URL'en
  if (category) {
    products = products.filter((p) =>
      (p.category || "").toLowerCase() === category.toLowerCase()
    );
  }

  // Tøm grid før vi lægger til (så vi ikke dobbeltrender)
  grid.innerHTML = "";

  // Laver et kort pr. produkt
  products.forEach((product) => {
    const hasDiscount = Number(product.discount) > 0;
    const nowPrice = hasDiscount
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

    // Byg markup med +=
    grid.innerHTML += `
      <article class="product-card${product.soldout ? " sold-out_container" : ""}">
        ${product.soldout ? `<div class="sold-out">Sold Out</div>` : ""}
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
        <h3><strong>${product.productdisplayname}</strong></h3>
        <p class="grey">${product.articletype} | ${product.brandname}</p>

        ${
          hasDiscount
            ? `
              <div class="sale">
                <p>Prev. DKK <span>${product.price}</span>,-<br>Now DKK ${nowPrice},-</p>
                <p class="sale-red">-${product.discount}%</p>
              </div>
            `
            : `<p>DKK ${product.price},-</p>`
        }

        <a href="produkt.html?id=${product.id}">Read More</a>
      </article>
    `;
  });
}