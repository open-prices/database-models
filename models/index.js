var Price = require('./Price')
var Product = require('./Product')
var ProductName = require('./ProductName')
var User = require('./User')
var Vendor = require('./Vendor')

var models = {
    Price,
    Product,
    ProductName,
    User,
    Vendor
}

module.exports = {

    models,

    createModels(sequelize, DataTypes) {
        return Object.keys(models).map(name => {
            return models[name](sequelize, DataTypes)
        })
    },

    createRelations(sequelize) {

        var {
            Price,
            Product, ProductName,
            User,
            Vendor
        } = sequelize.models

        Price.belongsTo(User)
        Price.belongsTo(Vendor)
        Price.belongsTo(Product)

        Product.hasMany(ProductName)
        Product.hasMany(Price)
        Product.belongsToMany(Vendor, { through: 'VendorProduct' })

        ProductName.belongsTo(User)
        ProductName.belongsTo(Product)

        User.hasMany(Price)
        User.hasMany(ProductName)

        Vendor.hasMany(Price)
        Vendor.belongsToMany(Product, { through: 'VendorProduct' })

    }

}