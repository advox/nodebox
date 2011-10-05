/*
 * Defines the Project entity model
 */

exports = module.exports = function( db, DataTypes ) {
    return db.define('Project', {
        id:          { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title:       { type: DataTypes.STRING },
        description: { type: DataTypes.TEXT }
    });
};