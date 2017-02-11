var Promise = require('bluebird');

var sequelize = require('../sequelize');

var {
	Price,
	Product, ProductName,
	User,
	Vendor
} = sequelize.models

var setups = {}

setups.products = (function(products){

	var promises = products.map(function(source){

		Product.findOne({
			where : { barcode : ''+source.barcode }
		}).then(function(product){

			if(!source.prices){ return; }

			source.prices.map(function(price){

				var p1 = User.findOne({
					where : { username : price.username }
				}).then(function(user){
					if (!user) { return Promise.reject('no user ' + price.username); }
					return user;
				});
				var p2 = Vendor.findOne({
					where : { code : ''+price.vendor }
				});

				Promise.all([p1, p2]).spread(function(user, vendor){

					vendor.hasProduct(product).then(function(has){
						if (!has) {
							vendor.addProduct(product);
						}
					});

					return Price.create({
						price : price.price,
						date : price.date,
						ProductId : product.id,
						UserId : user.id,
						VendorId : vendor.id
					}).then(function(price){
						console.log('new price', price.get());
					}).catch(function(err){ console.error(err); });

				}).catch(function(err){ console.error(err); });

			});
						
		});

		

	});
	return Promise.all( promises );

})( loadJSON('./examples/products.json') );

function loadJSON(file){
	var str = require('fs').readFileSync(file);
	return JSON.parse(str);
}

function onError(err){ return console.error(err); }
