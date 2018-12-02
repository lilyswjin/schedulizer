'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    start_date: DataTypes.BIGINT,
    end_date: DataTypes.BIGINT,
    project_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  Schedule.associate = function(models) {
    // associations can be defined here
  };
  return Schedule;
};

