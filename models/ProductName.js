module.exports = (sequelize, DataTypes) => {

    var Model = sequelize.define('ProductName', {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        }
    }, {
        indexes : [{
            unique : true,
            fields : ['ProductId', 'UserId']
        }]
    });

    return Model

}