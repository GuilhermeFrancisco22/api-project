const main = document.getElementById("main");
const navMenu = document.getElementById("nav-menu");
const sectionBanner = document.getElementById("section-banner");

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

    const backButton = document.querySelector(".home")
    backButton.addEventListener('click', function () {
        fetchCards(); // Retorna à lista de categorias
    });

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card';
        productCard.innerHTML = `
        <div class="card">
      <img class="card-img-top" src="${product.image}" alt="Card image" style="width:100%">
      <div class="card-body">
        <h4 class="card-title">${product.title}</h4>
        <p class="card-text">${product.description}</p>
        <p class="card-text">${product.price}</p>
        <p class="card-text">${product.category}</p>
        <a href="#" class="btn btn-primary">buy</a>
      </div>
      </div>
    `;
        main.appendChild(productCard);
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
  for (const element of cards) {
      main.innerHTML += `
      <div class="card d-flex flex-wrap align-items-center">
      <img class="card-img" src="${element.image}" alt="${element.title
      }" />
      <div class="card-body">
        <h4 class="card-title">${element.title}</h4>
        <p class="card-text">${element.price}</p>
        <div class="accordion accordion-flush">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapse${element.id}"
                aria-expanded="false"
                aria-controls="flush-collapse${element.id}"
              >
                description
              </button>
            </h2>
            <div
              id="flush-collapse${element.id}"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
              <p class="card-subtitle">${element.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
        <a href="#" class="btn btn-outline-light buy">buy</a>
        </div>
      </div>
    </div>
          `
  }
}

// Chame a função para carregar todos os cards ao carregar a página
fetchCards();

// Chame a função para carregar as categorias ao carregar a página
fetchCategories();

