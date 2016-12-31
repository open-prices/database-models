var crypto = require('crypto')
var uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {

    var Model = sequelize.define('User', {
        username : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
            validate : {
                isEmail : true
            }
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
            set : function(value){
                var salted_pass = value + this.getDataValue('password_salt');
                var hash = crypto.createHmac('sha256', '').update(salted_pass).digest('hex');
                this.setDataValue('password', hash);
            }
        },
        password_salt : {
            type : DataTypes.STRING,
            allowNull : false,
            defaultValue : function(){
                return uuid.v4();
            }
        }
    }, {
        instanceMethods : {
            passwordEquals : function(str){
                var password = this.getDataValue('password');
                var salt = this.getDataValue('password_salt');
                var hash = crypto.createHmac('sha256', '').update(str + salt).digest('hex');
                return (password == hash);
            }
        }
    });

    return Model

}