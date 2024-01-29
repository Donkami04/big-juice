const { Bills } = require("../db/models/bills");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const { getCurrentTime } = require("../utils/currentTime");
const { IngredientsController } = require("./ingredients.controller");
const { ProductsController } = require("./products.controller");

class BillsController {
  static async getBills(initialDate, finalDate, ubication) {
    try {
      const bills = await Bills.findAll({
        where: {
          date: {
            [Op.between]: [`${initialDate} 00:00`, `${finalDate} 23:59`],
          },
          ubication: ubication,
        },
      });
      return bills;
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener los gastos.",
        error: error.message,
      };
    }
  }

  static async createBill(data, user) {
    try {
      const currentDateTime = getCurrentTime();
      const newBill = await Bills.create({
        name: data.name,
        amount: data.amount,
        ubication: data.ubication,
        date: currentDateTime,
        user: user,
        description: data.description,
      });

      if (data.dataBill) {
        await Promise.all([
          IngredientsController.increaseInventoryIngredient(data),
          ProductsController.increaseInventoryProduct(data),
        ]);
      }

      return {
        status: 201,
        message: "La compra ha sido creada.",
        data: newBill,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Error con la creación de la compra",
        error: error.message,
      };
    }
  }

  static async editOneBill(id, changes) {
    try {
      const bill = await Bills.findByPk(id);
      if (!bill) {
        return {
          status: 404,
          message: "La compra no existe.",
        };
      }
      await Bills.update(
        {
          name: changes.name,
          amount: changes.amount,
          ubication: changes.ubication,
          date: changes.date,
          user: changes.user,
          user_id: changes.user_id,
          description: changes.description,
        },
        { where: { id: id } }
      );
      return {
        status: 200,
        message: "La compra ha sido modificado.",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error del servidor al editar la compra",
        error: error.message,
      };
    }
  }

  static async deleteBill(id) {
    try {
      const bill = await Bills.findOne({
        where: { id: id },
      });
      if (!bill) {
        return {
          status: 404,
          message: "La compra no existe",
        };
      }

      await Bills.destroy({ where: { id: id } });
      const checkBillIsDeleted = await Bills.findByPk(bill.id);
      if (checkBillIsDeleted === null) {
        return {
          status: 200,
          message: "La compra ha sido eliminado exitosamente",
        };
      } else {
        throw error;
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error en el servidor al eliminar la compra",
        error: error.message,
      };
    }
  }

  static async totalBills(initialDate, finalDate, ubication) {
    let totalBills = 0;
    try {
      const bills = await Bills.findAll({
        where: {
          date: {
            [Op.between]: [
              new Date(`${initialDate} 00:00`),
              new Date(`${finalDate} 23:59`),
            ],
          },
          ubication: ubication,
        },
      });

      bills.forEach((sale) => {
        totalBills += sale.amount;
      });

      return {
        status: 200,
        data: totalBills,
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error en el cálculo de la venta total: ${error}`,
      };
    }
  }
}

module.exports = { BillsController };
