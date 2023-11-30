module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      rol: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });
    
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sale_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      hielo: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      leche: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      leche_polvo: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      azucar: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      pulpa: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      saborizante: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      tarrina: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue : 0
      },
      pitillo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue : 0
      },
    });

    await queryInterface.createTable('ingredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('ingredients');

  },
};
