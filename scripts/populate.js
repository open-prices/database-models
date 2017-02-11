var sha256 = function sha256(str) {
	var crypto = require('crypto');
	var hash = crypto.createHmac('sha256', 'open-prices').update(str).digest('hex');
	return hash;
}

var sequelize = require('../sequelize');

var {
	Price,
	Product, ProductName,
	User,
	Vendor
} = sequelize.models

var setups = {}

setups.users = (function(users){

	var promises = users.map(function(user){
		return User.create({
			username : user.username,
			password : user.password,
		});
	});
	return Promise.all( promises );

})( loadJSON('./examples/users.json') )

setups.products = (function(products){

	var promises = products.map(function(product){
		return Product.create({
			barcode : product.barcode
		}).then(function(p){

			ProductName.create({
				name : product.name,
				ProductId : p.id,
				UserId : 1
			}).then(function(pn){
				console.log(pn.get());
			}).catch(function(err){
				console.error(err);
			});

			return p;
		});
	});
	return Promise.all( promises );

})( loadJSON('./examples/products.json') );

setups.vendors = (function(vendors){
	
	var Persona = require('node-afip').Persona;

	var promises = vendors.map(function(vendor){
		
		return Persona.find(vendor).then(function(persona){
			
			return Vendor.create({
				code : persona.get('idPersona'),
				name : persona.get('name'),
				address : persona.get('address')
			}).catch(function(err){
				console.log('vendor', err);
			});

		});

	});
	return Promise.all( promises );

})( loadJSON('./examples/vendors.json') );

function loadJSON(file){
	return require(file)
	var str = require('fs').readFileSync(file);
	return JSON.parse(str);
}

function onError(err){ return console.error(err); }
