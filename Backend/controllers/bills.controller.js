const { Bills } = require("../db/models/bills");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const { getCurrentTime } = require("../utils/currentTime");

class BillsController {
  static async getBills() {
    try {
      const bills = await Bills.findAll();
      return bills;
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener los gastos.",
        error: error.message,
      };
    }
  }

  static async createBill(data) {
    try {
      const currentDateTime = getCurrentTime();
      const newBill = await Bills.create({
        name: data.name,
        amount: data.amount,
        ubication: data.ubication,
        date: currentDateTime,
        user: data.user,
        user_id: data.user_id,
        description: data.description,
      });

      return {
        status: 201,
        message: "El Gasto ha sido creado.",
        data: newBill,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error con el creación de el gasto",
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
          message: "El Gasto no existe.",
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
        message: "El Gasto ha sido modificado.",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error del servidor al editar el gasto",
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
          message: "El Gasto no existe",
        };
      }

      await Bills.destroy({ where: { id: id } });
      const checkBillIsDeleted = await Bills.findByPk(bill.id);
      if (checkBillIsDeleted === null) {
        return {
          status: 200,
          message: "El Gasto ha sido eliminado exitosamente"
        };
      } else {
        throw error;
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error en el servidor al eliminar el Gasto",
        error: error.message,
      };
    }
  }

  static async totalBills(initialDate, finalDate, ubication) {
    let totalBills = 0;
    try {
      const sales = await Bills.findAll({
        where: {
          date: {
            [Op.between]: [new Date(initialDate), new Date(finalDate)],
          },
          ubication: ubication
        },
      });

      sales.forEach((sale) => {
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
