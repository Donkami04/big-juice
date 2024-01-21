const { Products } = require("../db/models/products");
const { Sequelize } = require("sequelize");
const { IngredientsController } = require("./ingredients.controller");

class ProductsController {
  static async getProducts() {
    try {
      const products = await Products.findAll();
      return products;
    } catch (error) {
      return {
        status: 500,
        message: `Error al obtener los productos: ${error.message}.`,
      };
    }
  }

  static async createProduct(data) {
    try {
      console.log(data)
      const productDoesExist = await Products.findOne({
        where: { name: data.name, ubication: data.ubication },
      });
      if (productDoesExist) {
        return {
          status: 409,
          message: "El Producto ya existe.",
        };
      }
      const newProduct = await Products.create({
        name: data.name.toLowerCase(),
        quantity: data.quantity,
        sale_price: data.sale_price,
        category: data.category,
        ubication: data.ubication,
        hielo: data.hielo,
        leche: data.leche,
        leche_polvo: data.leche_polvo,
        azucar: data.azucar,
        pulpa: data.pulpa,
        saborizante: data.saborizante,
        canela: data.canela,
        miel: data.miel,
        tarrina: data.tarrina,
        pitillo: data.pitillo,
      });

      return {
        status: 201,
        message: "El Producto ha sido creado.",
        data: newProduct,
      };
    } catch (error) {
      console.error(error.message);
      return {
        status: 500,
        message: `Error con la creación del producto: ${error.message}.`,
      };
    }
  }

  static async editOneProduct(id, changes) {
    try {
      const product = await Products.findByPk(id);
      if (!product) {
        return {
          status: 404,
          message: "El Producto no existe.",
        };
      }
      await Products.update(
        {
          name: changes.name.toLowerCase(),
          quantity: changes.quantity,
          sale_price: changes.sale_price,
          category: changes.category,
          ubication: changes.ubication,
          hielo: changes.hielo,
          leche: changes.leche,
          leche_polvo: changes.leche_polvo,
          azucar: changes.azucar,
          pulpa: changes.pulpa,
          canela: changes.canela,
          miel: changes.miel,
          tarrina: changes.tarrina,
          pitillo: changes.pitillo,
        },
        { where: { id: id } }
      );
      return {
        status: 200,
        message: "El Producto ha sido modificado exitosamente.",
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error del servidor al editar el producto ${error.message}.`,
      };
    }
  }

  static async deleteProduct(id) {
    try {
      const product = await Products.findOne({ where: { id: id } });
      if (!product) {
        return {
          status: 404,
          message: "El Producto no existe",
        };
      }

      await Products.destroy({ where: { id: id } });
      const checkProductIsDeleted = await Products.findByPk(id);
      if (checkProductIsDeleted === null) {
        return {
          status: 200,
          message: "El Producto ha sido eliminado exitosamente",
        };
      } else {
        throw error;
      }
    } catch (error) {
      return {
        status: 500,
        message: `Error en el servidor al eliminar el producto: ${error.message}`,
      };
    }
  }

  static async discountStock(productsToSell, ubication) {
    try {
      // Bucle for para validar stock del producto
      for (const product of productsToSell) {
        const productName = product.name;
        const quantitySold = product.quantity;

        const productDoesExist = await Products.findOne({
          where: { name: productName, ubication: ubication },
        });

        if (productDoesExist === null) {
          console.log("PRODUCTO NO EXISTE");
          throw new Error(
            `El producto ${productName.toUpperCase()} no existe.`
          );
        }

        if (productDoesExist.quantity === 0) {
          console.log("PRODUCTO ES 0");
          throw new Error(
            `El producto ${productName.toUpperCase()} está agotado.`
          );
        }

        if (quantitySold > productDoesExist.quantity) {
          console.log("LA VENTA SUPERA EL STOCK");
          throw new Error(
            `No hay suficiente cantidad de ${productName.toUpperCase()} para realizar esta venta.`
          );
        }
      }
      // Si el stock esta OK se procede al descuento del inventario
      for (const product of productsToSell) {
        const productName = product.name;
        const quantitySold = product.quantity;

        Products.update(
          { quantity: Sequelize.literal(`quantity - ${quantitySold}`) },
          { where: { name: productName, ubication: ubication } }
        );
      }

      return {
        status: 200,
        message: "Todos los productos han sido actualizados correctamente.",
      };
    } catch (error) {
      return {
        status: 404,
        message: `Error al actualizar los productos`,
        error: error.message,
      };
    }
  }

  static async increaseStockProduct(productsToIncrease) {
    try {
      for (const product of productsToIncrease) {
        const productName = product.name;
        const quantityProduced = product.quantity;
        const ubication = product.ubication;
        Products.update(
          { quantity: Sequelize.literal(`quantity + ${quantityProduced}`) },
          { where: { name: productName, ubication: ubication } }
        );

        const dataProduct = await Products.findOne({
          where: { name: productName, ubication: ubication },
        });

        await IngredientsController.discountIngredientsStock(
          dataProduct,
          quantityProduced,
          ubication
        );

        return {
          status: 200,
          message: "Todos los productos han sido actualizados correctamente.",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: `Error al actualizar los productos e ingredientes: ${error.message}`,
      };
    }
  }
}

module.exports = { ProductsController };
