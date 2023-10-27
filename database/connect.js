const main = document.querySelector(".main");
const navMenu = document.getElementById("nav-menu");
const divBestProduct = document.querySelector(".card-produts")
const menuFooter = document.querySelector(".menu-footer")
const partnersImgs = document.querySelector(".partners-imgs")
const submitEmail = document.querySelector(".email-btn");

const url = 'https://fakestoreapi.com'

function displayAlert(message) {
  const alertHTML = `
    <div class="alert alert-warning alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x alert-fixed-top" role="alert">
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
        ${message}
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', alertHTML);
}

document.getElementById("search-form").addEventListener("submit", function (event) {

  const searchTerm = document.getElementById("search-term").value;

  fetchProductById(searchTerm);
});

function fetchProductById(productId) {
  main.innerHTML = "";
  fetch(`${url}/products/${productId}`)
    .then(res => res.json())
    .then(json => displayProduct(json))
    .catch(function (e) {
      displayAlert("Por favor, insira um ID de produto válido.");
      console.log("Deu Erro!", e);
    });
}

function displayProduct(product) {
  main.innerHTML = generateCardHTML(product);
}

function fetchCategories() {
  main.innerHTML = "";
  fetch(`${url}/products/categories`)
    .then(res => res.json())
    .then(json => displayCategories(json))
    .catch(function (e) { console.log("Deu Erro!", e) });
}

function displayCategories(jsonDados) {
  navMenu.innerHTML = '';
  menuFooter.innerHTML = ""
  for (const category of jsonDados) {
    const navDrop = document.createElement('a');
    navDrop.className = "dropdown-item";
    navDrop.href = "#main";
    navDrop.textContent = category;

    navDrop.addEventListener("click", () => {
      fetchCategoryProducts(category);
    });

    const listItem = document.createElement('li');
    listItem.appendChild(navDrop);

    navMenu.appendChild(listItem);

    const menuFooterOption = document.createElement('a');
    menuFooterOption.className = "nav-link p-0 nav-footer";
    menuFooterOption.href = "#main";
    menuFooterOption.textContent = category;

    menuFooterOption.addEventListener("click", () => {
      fetchCategoryProducts(category);
    });

    const listFooter = document.createElement('li');
    listFooter.className = "nav-item mb-2"
    listFooter.appendChild(menuFooterOption);

    menuFooter.appendChild(listFooter);
  }
}

function fetchBestProduct() {
  fetch(`${url}/products/16`)
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
          <button class="btn btn-outline-light buy">Buy Now</button>
        </div>
      </div>
  `;
}

function fetchCategoryProducts(category) {
  main.innerHTML = "";
  fetch(`${url}/products/category/${category}`)
    .then(res => res.json())
    .then(json => displayCategoryProducts(json))
    .catch(function (e) { console.log("Deu Erro!", e) });
}

function displayCategoryProducts(products) {
  main.innerHTML = "";

  const backButton = document.querySelector(".products")
  backButton.addEventListener('click', function () {
    fetchCards(); // Retorna à lista de categorias
  });

  products.forEach(element => {
    main.innerHTML += generateCardHTML(element);
  });
}

fetchCategories();

function fetchCards() {
  main.innerHTML = "";
  fetch(`${url}/products`)
    .then(res => res.json())
    .then(json => displayCards(json))
    .catch(function (e) { console.log("Deu Erro!", e) });
}

function displayCards(cards) {
  main.innerHTML = ""
  cards.forEach(element => {
    main.innerHTML += generateCardHTML(element)
  })
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
      <div class="modal-body card">
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
      <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModa${element.id}">
      more info
      </button>
      <button class="btn btn-outline-dark buy">Buy</button>
    </div>
  </div>
</div>
`
}

imgParterns(7)

function imgParterns(index) {
  for (let i = 1; i < index; i++) {
    partnersImgs.innerHTML += `
    <img src="../public/img/partners/${i}.svg" alt="" class="rounded border">
    `
  }
}

submitEmail.addEventListener("click", () => {
  const inputEmail = document.querySelector(".email-input");
  fetchUserLogin(inputEmail.value);
});

function fetchUserLogin(user) {
  console.log("Nome de usuário:", user);
  fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: "mor_2314",
      password: "83r5^_"
    })
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(error => console.error('Erro:', error));
}

imgParterns()

fetchBestProduct();

fetchCards();

fetchCategories();