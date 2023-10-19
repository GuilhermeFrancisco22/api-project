const url = 'https://fakestoreapi.com/products'
fetch(url)
  .then(res => res.json())
  .then(json => cards(json))

  function cards(info){
    info.forEach(dados => {
      
      main.innerHTML += `
      <div class="card" style="width:400px">
        <img class="card-img-top" src="${dados.image}" alt="Card image" style="width:100%">
        <div class="card-body">
          <h4 class="card-title">${dados.title}</h4>
          <p class="card-text">${dados.description}</p>
          <a href="#" class="btn btn-primary">buy</a>
        </div>
      `
    });
  }
  const main = document.getElementById("main")
