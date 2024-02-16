const express = require("express");
const app = express();
const PUERTO = 8080;
//traemos el productManager
const ProductManager = require("./controllers/productManager.js");
//instanciamos
const productManager = new ProductManager("./models/products.json");

//configuramos middleware
app.use(express.json());

//rutas
app.get("/", (req, res) => {
  res.send("conectado al servidor");
});
//listen
app.listen(PUERTO, () => {
  console.log(`escuchando en http://localhost:${PUERTO}`);
});

/////////////////////////////////////////////
// dejé en el minuto 14 del after
