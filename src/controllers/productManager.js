const fs = require("fs").promises;

class ProductManager {
  static lastID = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  //Métodos:

  async addProduct(newObject) {
    let { title, description, price, thumbnail, code, stock } = newObject;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((item) => item.code === code)) {
      console.log("El codigo debe ser unico");
      return;
    }

    const newProduct = {
      id: ++ProductManager.lastID,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);

    //Guardamos el array en el archivo:

    await this.saveFile(this.products);
  }

  async getProducts() {
    try {
      const arrayProductos = this.readFile();
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.readFile();
      const prodFinded = arrayProductos.find((item) => item.id === id);

      if (!prodFinded) {
        console.log("Producto no encontrado");
      } else {
        console.log("Producto encontrado! ");
        return prodFinded;
      }
    } catch (error) {
      console.log("Error al leer el archivo ", error);
    }
  }

  //Nuevos metodos desafio 2:

  async readFile() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Eerror al leer un archivo", error);
    }
  }

  async saveFile(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }

  //Actualizamos algun producto:
  async updateProduct(id, productoActualizado) {
    try {
      const arrayProductos = await this.readFile();

      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        //Puedo usar el método de array splice para reemplazar el objeto en la posicion del index:
        arrayProductos.splice(index, 1, productoActualizado);
        await this.saveFile(arrayProductos);
      } else {
        console.log("no se encontró el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }
}

module.exports = ProductManager;
