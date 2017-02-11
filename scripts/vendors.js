var sequelize = require('../sequelize')

var { Vendor, Product } = sequelize.models

Vendor.all({
    include : [Product]
}).then(vendors => {
    var ps = vendors.map(p => p.get({ plain : true }))
    var p = JSON.stringify(ps[0], null, 2)
    console.log(p)
})