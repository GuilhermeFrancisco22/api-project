const main = document.getElementById("main");
const navMenu = document.getElementById("nav-menu");
const divBestProduct = document.querySelector(".card-produts");

function fetchCategories() {
  main.innerHTML = "";

  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(json => displayCategories(json))
    .catch(function (e) { console.log("Deu Erro!", e) });
}

function displayCategories(jsonDados) {
  navMenu.innerHTML = '';
  for (const category of jsonDados) {
    const navDrop = document.createElement('a');
    navDrop.className = "dropdown-item";
    navDrop.href = "#";
    navDrop.textContent = category;

    navDrop.addEventListener("click", () => {
      fetchCategoryProducts(category);
    });

    const listItem = document.createElement('li');
    listItem.appendChild(navDrop);

    navMenu.appendChild(listItem);
  }
}

function fetchCategoryProducts(category) {
  main.innerHTML = "";

  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(json => displayCategoryProducts(json, category))
    .catch(function (e) { console.log("Deu Erro!", e) });
}

function displayCategoryProducts(products, category) {
  main.innerHTML = "";

  const backButton = document.querySelector(".products")
  backButton.addEventListener('click', function () {
    fetchCards(); // Retorna à lista de categorias
  });

  products.forEach(element => {
    main.innerHTML += generateCardHTML(element);
  });
}

fetchCategories();// ...

function fetchCards() {
  main.innerHTML = "";
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => displayCards(json))
    .catch(function (e) { console.log("Deu Erro!", e) });
}

function displayCards(cards) {
  cards.forEach(element => {
    main.innerHTML += generateCardHTML(element)
  })
}

// let randomId = Math.trunc(Math.random() * 19) + 1
function fetchBestProduct() {
  fetch(`https://fakestoreapi.com/products/16`)
    .then(res => res.json())
    .then(json => cardBest(json))
    .catch(function (e) { console.log("Deu Erro!", e) });
}

function cardBest(element) {
  divBestProduct.innerHTML = `
      <div class="imgBx">
        <img src="${element.image}" >
      </div>
      <div class="details">
        <h3>${element.title}</br><span>${element.category}</span></h3>
        <div class="group">
          <h2><sup>$</sup>${element.price}</h2>
          <a href="#" class="btn btn-outline-light">Buy Now</a>
        </div>
      </div>
  `;
}

function generateCardHTML(element) {
  return `
  <div
  class="modal fade"
  id="exampleModa${element.id}"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
          <img class="card-img mx-auto" src="${element.image}" alt="${element.title}" />
            <h4 class="card-title">${element.title}</h4>
            <p class="card-text">${element.price}</p>
            <p class="card-subtitle">$${element.description}</p>
            <a href="#" class="btn btn-outline-light buy">buy</a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="col">
  <div class="card h-100"> 
    <img src="${element.image}" class="card-img-top mx-auto" alt="${element.title}">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">$${element.price}</p>
    </div>
    <div class="card-footer">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModa${element.id}">
    more info
    </button>
    <a href="#" class="btn btn-outline-light buy">buy</a>
    </div>
  </div>
`
}

// function displayCards(cards) {
//   for (const element of cards) {

//   }
// }

// function cardBest(element) {
//   divBestProduct.innerHTML = generateCardHTML(element);
// }


// Chama a função para buscar o melhor produto
fetchBestProduct();

// Chame a função para carregar todos os cards ao carregar a página
// fetchCards();

// Chame a função para carregar as categorias ao carregar a página
fetchCategories();

