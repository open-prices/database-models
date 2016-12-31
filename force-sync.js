var sequelize = require('./sequelize')

sequelize.sync({
    force : true
})