module.exports = (sequelize, DataTypes) => {

    var Model = sequelize.define('Vendor', {
        code : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        name : {
            type : DataTypes.STRING
        },
        address : {
            type : DataTypes.STRING
        }
    });

    return Model

}