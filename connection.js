var Sequelize = require('sequelize');

var { createModels, createRelations } = require('./models')

function connection(options = {}) {

	var sequelize = new Sequelize('postgres', 'postgres', 'amteki17', {
		dialect: 'postgres',
		logging : options.logging
	});

	createModels(sequelize, Sequelize)
	createRelations(sequelize)

	return sequelize

}

module.exports = connection;
