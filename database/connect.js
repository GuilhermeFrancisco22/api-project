const main = document.getElementById("main");
const navMenu = document.getElementById("nav-menu");
const sectionBanner = document.getElementById("section-banner");

// Função para carregar as categorias
function fetchCategories() {
    main.innerHTML = ""; // Limpa o conteúdo principal

    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(json => displayCategories(json))
        .catch(function (e) { console.log("Deu Erro!", e) });
}

// Função para exibir as categorias
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


// Função para carregar os produtos de uma categoria
function fetchCategoryProducts(category) {
    main.innerHTML = ""; // Limpa o conteúdo principal

    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(json => displayCategoryProducts(json, category))
        .catch(function (e) { console.log("Deu Erro!", e) });
}

// Função para exibir os produtos de uma categoria
function displayCategoryProducts(products, category) {
    main.innerHTML = "";

    const backButton = document.createElement('button');
    backButton.textContent = "Voltar";
    backButton.addEventListener('click', function () {
        fetchCategories(); // Retorna à lista de categorias
        backButton.style.display = "none"
    });
    sectionBanner.appendChild(backButton);

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

// Chame a função para carregar as categorias iniciais
fetchCategories();

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => fetchCards(json))
    .catch(function (e) { console.log("Deu Erro!", e) });

function fetchCards(cards) {
    for (const element of cards) {
        main.innerHTML += `
        <div class="card">
        <img class="card-img-top" src="${element.image}" alt="Card image" />
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
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  description
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                <p class="card-subtitle">${element.description}</p>
                <p class="card-text">${element.category}</p>
                </div>
              </div>
            </div>
          </div>
          <a href="#" class="btn btn-primary">buy</a>
        </div>
      </div>
            `
    }
}