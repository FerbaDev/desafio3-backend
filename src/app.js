const express = require("express");
const app = express();
const PUERTO = 8080;
//traemos el productManager
const ProductManager = require("./controllers/productManager.js");
//instanciamos
const productManager = new ProductManager("./src/models/products.json");

//configuramos middleware
app.use(express.json());

//rutas
//listar los prod del json
app.get("/products", async (req, res) => {
  try {
    let limit = req.query.limit;
    let productos = await productManager.getProducts();
    if (limit) {
      res.json(productos.slice(0, limit));
    } else {
      res.json(productos);
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
//listen
app.listen(PUERTO, () => {
  console.log(`escuchando en http://localhost:${PUERTO}`);
});

//retornar por id
app.get("/products/:pid", async (req, res) => {
  try {
    let id = req.params.pid;
    let producto = await productManager.getProductById(id);
    if (!producto) {
      return res.json({ error: "id no encontrado" });
    }
    return res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
