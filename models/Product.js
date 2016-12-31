module.exports = (sequelize, DataTypes) => {

    var Model = sequelize.define('Product', {
        barcode : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        }
    })

    return Model

}