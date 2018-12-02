'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
    start_date: DataTypes.BIGINT,
    end_date: DataTypes.BIGINT
  }, {
    underscored: true,
  });
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.Client, {
      foreignKey: 'client_id',
      onDelete: 'CASCADE'
    });
  //   Project.hasMany(models.Employee, {
  //     foreignKey: 'project_id',
  //     onDelete: 'CASCADE'
  //   });
    Project.belongsToMany(models.Employee, {
      through: 'Schedule',
      foreignKey: 'project_id',
      otherKey: 'employee_id',
      onDelete: 'CASCADE'
    })
  };
  return Project;
};