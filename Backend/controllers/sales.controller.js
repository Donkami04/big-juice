const { Sales } = require("../db/models/sales");
const { getCurrentTime } = require("../utils/currentTime");
const { Op } = require("sequelize");
const { ProductsController } = require("./products.controller");

class SalesController {
  static async getSales() {
    try {
      const sales = await Sales.findAll();
      return sales;
    } catch (error) {
      return {
        status: 500,
        message: `Error al obtener las ventas: ${error.message}.`,
      };
    }
  }

  static async newSale(data) {
    try {
      const currentDateTime = getCurrentTime();
      const soldProducts = data.products;
      const ubication = data.ubication;

      const response = await ProductsController.discountStock(soldProducts, ubication);
      if (response.status === 404) {
        throw new Error(response.error);
      }

      await Sales.create({
        ubication: data.ubication,
        amount: data.amount,
        user: data.user,
        id_user: data.id_user,
        date: currentDateTime,
        products: data.products,
        rappi: data.rappi,
        nequi: data.nequi
      });

      return {
        status: 201,
        message: "Venta creada exitosamente",
      };
    } catch (error) {
      console.error("Error al crear la venta:", error);
      return {
        status: 500,
        message: `Error al intentar hacer la venta`,
        error: error.message
      };
    }
  }


  static async totalSales(initialDate, finalDate, ubication) {
    let totalSales = 0;
    try {
      const sales = await Sales.findAll({
        where: {
          date: {
            [Op.between]: [new Date(initialDate), new Date(finalDate)],
          },
          ubication: ubication
        },
      });

      sales.forEach((sale) => {
        totalSales += sale.amount;
      });

      return {
        status: 200,
        data: totalSales,
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error en el cálculo de la venta total: ${error}`,
      };
    }
  }

  static async totalSalesCategory(initialDate, finalDate, category, ubication) {
    try {
      const salesCategory = [];
      let totalSalesCategory = 0;
      const sales = await Sales.findAll({
        where: {
          date: {
            [Op.between]: [new Date(initialDate), new Date(finalDate)],
          },
          ubication: ubication
        },
      });

      sales.forEach((sale) => {
        sale.products.forEach((e) => {
          salesCategory.push(e);
        });
      });
      salesCategory.forEach((sale) => {
        if (sale.category === category) {
          totalSalesCategory += sale.amount;
        }
      });
      return {
        status: 200,
        data: totalSalesCategory,
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error en el calculo de la venta: ${error}`,
      };
    }
  }

  static async deleteSale(id) {
    try {
      const sale = await Sales.findOne({ where: { id: id } });
      if (!sale) {
        return {
          status: 404,
          message: "La venta no existe en la base de datos",
        };
      }

      await Sales.destroy({ where: { id: sale.id } });
      const checkSaleIsDeleted = await Sales.findByPk(sale.id);
      if (checkSaleIsDeleted === null) {
        return {
          status: 200,
          message: "La venta ha sido eliminado exitosamente",
        };
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = { SalesController };
