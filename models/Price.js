module.exports = (sequelize, DataTypes) => {

    var Model = sequelize.define('Price', {
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
            indexes: [{
                unique: true,
                fields: ['ProductId', 'UserId', 'VendorId', 'date']
            }]
        });

    return Model

}