const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Admin = require("./Admin.model")(sequelize, Sequelize);
// const Customer = require("./customer.model")(sequelize, Sequelize);
// const Car = require("./carSchema")(sequelize, Sequelize);


// User.associate(sequelize.models);
// Customer.associate(sequelize.models);
// Car.associate(sequelize.models);
module.exports = { Admin, sequelize }