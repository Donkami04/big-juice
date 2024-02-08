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

  // static async getIngredients(ubication) {
  //   try {
  //     if (ubication) {
  //       const ingredients = await Ingredients.findAll({
  //         where: { ubication: ubication },
  //       });
  //       return ingredients;
  //     }
  //     const ingredients = await Ingredients.findAll();
  //     return ingredients;
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       message: `Error al obtener los ingredientes: ${error.message}.`,
  //     };
  //   }
  // }

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
        name: data.name.toLowerCase(),
        quantity: data.quantity,
        category: data.category,
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
          name: changes.name.toLowerCase(),
          quantity: changes.quantity,
          category: changes.category,
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

  static async increaseInventoryIngredient(data) {
    try {
      const ingredientsList = data.dataBill;
      const ubication = data.ubication;

      ingredientsList.forEach(async (e) => {
        if (e.category === "ingredient" || e.category === "others") {
          await Ingredients.update(
            {
              quantity: Sequelize.literal(`quantity + ${e.quantity}`),
            },
            { where: { name: e.name, ubication: ubication } }
          );
        }
      });

      return {
        status: 200,
        message: "El inventario de ingredientes ha sido modificado.",
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error del servidor al modificar el inventario - Ingredientes ${error.message}.`,
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

  static async discountIngredientsStock(
    dataProduct,
    quantityProduced,
    ubication
  ) {
    try {
      const ingredientUpdates = [
        { name: "hielo", quantity: dataProduct.hielo * quantityProduced },
        { name: "azucar", quantity: dataProduct.azucar * quantityProduced },
        { name: "leche", quantity: dataProduct.leche * quantityProduced },
        {
          name: "leche_polvo",
          quantity: dataProduct.leche_polvo * quantityProduced,
        },
        { name: "pulpa_mora", quantity: dataProduct.pulpa_mora * quantityProduced },
        { name: "pulpa_maracuya", quantity: dataProduct.pulpa_maracuya * quantityProduced },
        { name: "pulpa_mango", quantity: dataProduct.pulpa_mango * quantityProduced },
        { name: "pulpa_lulo", quantity: dataProduct.pulpa_lulo * quantityProduced },
        { name: "pulpa_guanabana", quantity: dataProduct.pulpa_guanabana * quantityProduced },
        { name: "pulpa_borojo", quantity: dataProduct.pulpa_borojo * quantityProduced },
        {
          name: "saborizante",
          quantity: dataProduct.saborizante * quantityProduced,
        },
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
      console.log(error)
      return {
        status: 500,
        message: error.message,
      };
    }
  }



}

module.exports = { IngredientsController };
