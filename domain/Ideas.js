/*
 * Defines the Idea model entity
 */

exports = module.exports = function(db, DataTypes) {
  return db.define('Idea', {
      id: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
      title: {type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      votes: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false }
  });
};