var Sequelize = require('sequelize');

var { createModels, createRelations } = require('./models')

var sequelize = new Sequelize('postgres', 'postgres', 'amteki17', {
	dialect : 'postgres'
});

createModels(sequelize, Sequelize)
createRelations(sequelize)

module.exports = sequelize;
