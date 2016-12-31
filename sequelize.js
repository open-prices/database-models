var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres', 'postgres', 'amteki17', {
	dialect : 'postgres'
})

(function importModels(){

	sequelize.import('./models/Product')
	sequelize.import('./models/ProductName')
	sequelize.import('./models/Vendor')
	sequelize.import('./models/Price')
	sequelize.import('./models/User')

})();

(function createRelations(){

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

})();

module.exports = sequelize;
