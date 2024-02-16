import express from "express";
const app = express();
const PUERTO = 8080;

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
