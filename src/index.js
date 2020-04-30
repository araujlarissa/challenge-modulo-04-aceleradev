const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
const products = require('./data/products.json');

const ex1 = [120, 230, 310, 490];
const ex2 = [130, 140, 230, 260];
const ex3 = [110, 120, 130, 140];
const ex4 = [110, 130, 140, 230, 310, 330];

function formatProduct(ids, data) {
	const selectProducts = [];

	ids.map(id => {
		data.products.map(product => {
			if (product.id === id) {
				const { name, category } = product;

				selectProducts.push({
					name, 
					category
				});
			}
		});
	});

	return selectProducts;
}

function calcPromotion(products) {
	let promotion = '';

 	const TSHIRT = products.filter(product => product.category === 'T-SHIRTS');
	const PANTS = products.filter(product => product.category === 'PANTS');
	const SHOES = products.filter(product => product.category === 'SHOES');
	const BAGS = products.filter(product => product.category === 'BAGS');

	if (TSHIRT.length === 4 || PANTS.length === 4 || SHOES.length === 4 || BAGS.length === 4) {
		promotion = 'SINGLE LOOK';
		return promotion;
	}

	if (TSHIRT.length === 3 || PANTS.length === 3 || SHOES.length === 3 || BAGS.length === 3) {
		promotion = 'TRIPLE LOOK';
		return promotion;
	}

	if (TSHIRT.length === 2 || PANTS.length === 2 || SHOES.length === 2 || BAGS.length === 2) {
		promotion = 'DOUBLE LOOK';
		return promotion;
	}

	if (TSHIRT.length === 1 || PANTS.length === 1 || SHOES.length === 1 || BAGS.length === 1) {
		promotion = 'FULL LOOK';
		return promotion;
	}
}

function calcTotalPrice(ids, data, promotion) {
	const prices = [];
	const pricesRegular = [];
	let price = 0;

	ids.map(id => {
		data.products.map(product => {
			if (product.id === id) {
				price = product.regularPrice;
				pricesRegular.push(price);

				product.promotions.map(promo => {
					if (promo.looks.includes(promotion)) {
						price = promo.price;
					} 
				});

				prices.push(price);
			}
		});
	});

	
	var totalPrice = prices.reduce((total, num) => total + num, 0);
	var totalPriceRegular = pricesRegular.reduce((total, num) => total + num, 0);
	
	var discountValue = totalPriceRegular - totalPrice;
	var discountPercent = (discountValue * 100)/totalPriceRegular;

	return [ totalPrice.toFixed(2), discountValue.toFixed(2), discountPercent.toFixed(2) ];
}

function getShoppingCart(ids, products) {
	const prod = formatProduct(ids, products);
	const promo = calcPromotion(prod);
	console.log(promo);
	const [ totalPrice, discountValue, discount ] = calcTotalPrice(ids, products, promo);
	console.log(totalPrice);
	console.log(discountValue);
	console.log(discount);
	// return {};
}

const cart = getShoppingCart(ex4, products);

module.exports = { getShoppingCart, formatProduct };
