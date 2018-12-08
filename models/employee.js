'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    long: DataTypes.DECIMAL,
    street: DataTypes.STRING,
    post_code: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    underscored: true,
  });
  Employee.associate = function(models) {
    // associations can be defined here
    // Employee.belongsTo(models.Project, {
    //   foreignKey: 'project_id',
    //   onDelete: 'CASCADE'
    // })

    Employee.belongsToMany(models.Project, {
      through: 'Schedule',
      foreignKey: 'employee_id',
      otherKey: 'project_id',
      onDelete: 'CASCADE'
    })
  };
  return Employee;
};