const { Users } = require("../db/models/users");

class UserController {
  static async getUsers() {
    try {
      let users = await Users.findAll({
        attributes: { exclude: ["password"] },
      });
      return users;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  static async createUser(data) {
    try {
      const userDoesExist = await Users.findOne({
        where: { id: data.id },
      });
      if (userDoesExist) {
        return {
          status: 409,
          message: "El Usuario ya existe en la base de datos.",
        };
      }
      const newUser = await Users.create({
        id: data.id,
        name: data.name,
        rol: data.rol,
        password: data.password,
        ubication: data.ubication
      });

      const dataNewUser = { ...newUser.get({ plain: true }) };
      delete dataNewUser.password;

      return {
        status: 201,
        message: "El Usuario ha sido creado.",
        data: dataNewUser,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async editOneUser(id, changes) {
    try {
      const user = await Users.findByPk(id);
      if (!user) {
        return {
          status: 404,
          message: "El Usuario no existe en la base de datos.",
        };
      }
      await Users.update(
        {
          id: changes.id,
          name: changes.name,
          rol: changes.rol,
          password: changes.password,
          ubication: changes.ubication
        },
        { where: { id: id } }
      );
      let userUpdated = await Users.findByPk(changes.id);
      userUpdated = { ...userUpdated.get({ plain: true }) };
      delete userUpdated.password;
      return {
        status: 200,
        message: "El Usuario ha sido modificado exitosamente.",
        data: userUpdated,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const user = await Users.findOne({ where: { id: id } });
      if (!user) {
        return {
          status: 404,
          message: "El Usuario no existe en la base de datos",
        };
      }

      await Users.destroy({ where: { id: user.id } });
      const checkUserIsDeleted = await Users.findByPk(user.id);
      if (checkUserIsDeleted === null) {
        return {
          status: 200,
          message: "El Usuario ha sido eliminado exitosamente",
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

module.exports = {UserController};
