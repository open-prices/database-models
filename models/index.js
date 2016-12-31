var models = [
    'Price',
    'Product', 'ProductName',
    'User',
    'Vendor'
    ]

module.exports = {

    createModels(sequelize, DataTypes){
        models.map(name => {
            return require('./'+name)
        }).map(factory => {
            factory(sequelize, DataTypes)
        })
    },

    createRelations(sequelize){
        
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
        Product.belongsToMany(Vendor, { through : 'VendorProduct' })

        ProductName.belongsTo(User)
        ProductName.belongsTo(Product)

        User.hasMany(Price)
        User.hasMany(ProductName)

        Vendor.hasMany(Price)
        Vendor.belongsToMany(Product, { through : 'VendorProduct' })

    }

}