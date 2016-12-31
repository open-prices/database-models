var sequelize = require('../sequelize')

var { Product } = sequelize.models

Product.create({
    barcode : '9876543210'
})
Product.create({
    barcode : '0123456789'
})