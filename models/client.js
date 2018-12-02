'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    long: DataTypes.DECIMAL
  }, {
    underscored: true,
  });
  Client.associate = function(models) {
    // associations can be defined here
    Client.hasMany(models.Project, {
      foreignKey: 'client_id',
      onDelete: 'CASCADE'
    });
  };
  return Client;
};