module.exports = (sequelize, type) => {
  const User = sequelize.define("users", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: type.STRING,
    password: type.STRING,
  });
  User.associate = (models) => {};
};
