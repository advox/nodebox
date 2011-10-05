/*
 * Defines the User entity model
 */

exports = module.exports = function( db, DataTypes ) {
    return db.define('User', {
        id:        { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        username:  { type: DataTypes.STRING, allowNull: false, unique: true },
        password:  { type: DataTypes.STRING, allowNull: false },
        salt:      { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING },
        lastName:  { type: DataTypes.STRING }
    });
};