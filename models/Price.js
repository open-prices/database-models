module.exports = (sequelize, DataTypes) => {

    var Model = sequelize.define('Price', {
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            set: function (value) {
                var date = new Date(value)
                date.setHours(0)
                date.setMinutes(0)
                date.setSeconds(0)
                date.setMilliseconds(0)
                this.setDataValue('date', date)
            }
        }
    }, {
            indexes: [{
                unique: true,
                fields: ['ProductId', 'UserId', 'VendorId', 'date']
            }]
        });

    return Model

}