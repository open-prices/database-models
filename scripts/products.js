var sequelize = require('../sequelize')

var { Product } = sequelize.models

Product.all().then(products => {
    var ps = products.map(p => p.get())
    console.log(ps)
})