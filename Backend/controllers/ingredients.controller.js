const { Ingredients } = require("../db/models/ingredients");
const { Sequelize } = require("sequelize");

class IngredientsController {

  static async getIngredients() {
    try {
      const ingredients = await Ingredients.findAll();
      return ingredients;
    } catch (error) {
      return {
        status: 500,
        message: `Error al obtener los ingredientes: ${error.message}.`,
      };
    }
  }

  static async createIngredient(data) {
    try {
      const ingredientDoesExist = await Ingredients.findOne({
        where: { name: data.name, ubication: data.ubication },
      });
      if (ingredientDoesExist) {
        return {
          status: 409,
          message: "El Ingredient ya existe.",
        };
      }
      const newIngredient = await Ingredients.create({
        name: data.name,
        quantity: data.quantity,
        ubication: data.ubication,
      });

      return {
        status: 201,
        message: "El Ingrediento ha sido creado.",
        data: newIngredient,
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error con la creación del ingrediento: ${error.message}.`,
      };
    }
  }

  static async editOneIngredient(id, changes) {
    try {
      const ingredient = await Ingredients.findByPk(id);
      if (!ingredient) {
        return {
          status: 404,
          message: "El Ingrediente no existe.",
        };
      }
      await Ingredients.update(
        {
          name: changes.name,
          quantity: changes.quantity,
          ubication: changes.ubication,
        },
        { where: { id: id } }
      );
      return {
        status: 200,
        message: "El Ingrediente ha sido modificado.",
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error del servidor al editar el ingredient ${error.message}.`,
      };
    }
  }

  static async deleteIngredient(id) {
    try {
      const ingredient = await Ingredients.findOne({ where: { id: id } });
      if (!ingredient) {
        return {
          status: 404,
          message: "El Ingrediente no existe",
        };
      }

      await Ingredients.destroy({ where: { id: id } });
      const checkIngredientIsDeleted = await Ingredients.findByPk(id);
      if (checkIngredientIsDeleted === null) {
        return {
          status: 200,
          message: "El Ingredient ha sido eliminado exitosamente",
        };
      } else {
        throw error;
      }
    } catch (error) {
      return {
        status: 500,
        message: `Error en el servidor al eliminar el ingrediente: ${error.message}`,
      };
    }
  }

  static async discountIngredientsStock(dataProduct, quantityProduced, ubication) {
    try {
      const ingredientUpdates = [
        { name: "hielo", quantity: dataProduct.hielo * quantityProduced },
        { name: "azucar", quantity: dataProduct.azucar * quantityProduced },
        { name: "leche", quantity: dataProduct.leche * quantityProduced },
        { name: "leche polvo", quantity: dataProduct.leche_polvo * quantityProduced },
        { name: "pulpa", quantity: dataProduct.pulpa * quantityProduced },
        { name: "saborizante", quantity: dataProduct.saborizante * quantityProduced },
        { name: "tarrina", quantity: dataProduct.tarrina * quantityProduced },
        { name: "pitillo", quantity: dataProduct.pitillo * quantityProduced },
      ];

      ingredientUpdates.forEach(async (e) => {
        await Ingredients.update(
          { quantity: Sequelize.literal(`quantity - ${e.quantity}`) },
          { where: { name: e.name, ubication: ubication } }
        );
      });
      
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  // static async discountIngredientsStock(dataProduct, quantityProduced, ubication) {
  //   try {
  //     const hieloQuantity = dataProduct.hielo * quantityProduced;
  //     const azucarQuantity = dataProduct.azucar * quantityProduced;
  //     const lecheQuantity = dataProduct.leche * quantityProduced;
  //     const leche_polvoQuantity = dataProduct.leche_polvo * quantityProduced;
  //     const pulpaQuantity = dataProduct.pulpa * quantityProduced;
  //     const saborizanteQuantity = dataProduct.saborizante * quantityProduced;
  //     const tarrinaQuantity = dataProduct.tarrina * quantityProduced;
  //     const pitilloQuantity = dataProduct.pitillo * quantityProduced;

  //     Ingredients.update(
  //       { quantity: Sequelize.literal(`quantity - ${hieloQuantity}`) },
  //       { where: { name: "hielo", ubication: ubication } }
  //     );
  //     Ingredients.update(
  //       { quantity: Sequelize.literal(`quantity - ${azucarQuantity}`) },
  //       { where: { name: "azucar", ubication: ubication } }
  //     );
  //     Ingredients.update(
  //       { quantity: Sequelize.literal(`quantity - ${lecheQuantity}`) },
  //       { where: { name: "leche", ubication: ubication } }
  //     );
  //     Ingredients.update(
  //       { quantity: Sequelize.literal(`quantity - ${leche_polvoQuantity}`) },
  //       { where: { name: "leche polvo", ubication: ubication } }
  //     );
  //     Ingredients.update(
  //       { quantity: Sequelize.literal(`quantity - ${pulpaQuantity}`) },
  //       { where: { name: "pulpa", ubication: ubication } }
  //     );
  //     Ingredients.update(
  //       { quantity: Sequelize.literal(`quantity - ${saborizanteQuantity}`) },
  //       { where: { name: "saborizante", ubication: ubication } }
  //     );
  //     Ingredients.update(
  //       { quantity: Sequelize.literal(`quantity - ${tarrinaQuantity}`) },
  //       { where: { name: "tarrina", ubication: ubication } }
  //     );
  //     Ingredients.update(
  //       { quantity: Sequelize.literal(`quantity - ${pitilloQuantity}`) },
  //       { where: { name: "pitillo", ubication: ubication } }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       status: 500,
  //       message: error.message,
  //     };
  //   }
  // }
}

module.exports = { IngredientsController };
