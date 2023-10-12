const url = "https://carros-luxuosos.onrender.com/cars"
fetch(url, { method: "GET" })
  .then(result => result.json())
  .then(dados => console.log(dados))