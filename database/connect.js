// const main = document.getElementById("main");

// // Função para carregar as categorias
// function fetchCategories() {
//   main.innerHTML = ""; // Limpa o conteúdo principal

//   fetch('https://fakestoreapi.com/products/categories')
//     .then(res => res.json())
//     .then(json => displayCategories(json))
//     .catch(function (e) { console.log("Deu Erro!", e) });
// }

// // Função para exibir as categorias
// function displayCategories(jsonDados) {
//   main.innerHTML = "";

//   for (const category of jsonDados) {
//     const categoryButton = document.createElement('button');
//     categoryButton.textContent = category;
//     categoryButton.addEventListener('click', function() {
//       fetchCategoryProducts(category);
//     });
//     main.appendChild(categoryButton);
//   }
// }

// // Função para carregar os produtos de uma categoria
// function fetchCategoryProducts(category) {
//   main.innerHTML = ""; // Limpa o conteúdo principal

//   fetch(`https://fakestoreapi.com/products/category/${category}`)
//     .then(res => res.json())
//     .then(json => displayCategoryProducts(json, category))
//     .catch(function (e) { console.log("Deu Erro!", e) });
// }

// // Função para exibir os produtos de uma categoria
// function displayCategoryProducts(products, category) {
//   main.innerHTML = "";

//   const backButton = document.createElement('button');
//   backButton.textContent = "Voltar";
//   backButton.addEventListener('click', function() {
//     fetchCategories(); // Retorna à lista de categorias
//   });
//   main.appendChild(backButton);

//   products.forEach(product => {
//     const productCard = document.createElement('div');
//     productCard.className = 'card';
//     productCard.innerHTML = `
//       <img class="card-img-top" src="${product.image}" alt="Card image" style="width:100%">
//       <div class="card-body">
//         <h4 class="card-title">${product.title}</h4>
//         <p class="card-text">${product.description}</p>
//         <p class="card-text">${product.category}</p>
//         <a href="#" class="btn btn-primary">buy</a>
//       </div>
//     `;
//     main.appendChild(productCard);
//   });
// }

// // Chame a função para carregar as categorias iniciais
// fetchCategories();
