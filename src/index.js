const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getPromotion(products) {
	const category = products.reduce((productDetails, product) => {
		if (!productDetails.includes(product.category)) productDetails.push(product.category);
		
		return productDetails;
	}, []);

	return promotions[category.length - 1];
}

function getPrices(products, promotion) {
	const totalRegularPrice = products.reduce((productRegularPrice, product) => {
		return productRegularPrice + product.regularPrice;
	}, 0);

	const totalPromotionPrice = products.reduce((productTotalPromotion, product) => {
		const productPromotionPrice = product.promotions.find(promo => promo.looks.includes(promotion));

		if (productPromotionPrice) {
			return productTotalPromotion + productPromotionPrice.price;
		} else {
			return productTotalPromotion + product.regularPrice;
		}
	}, 0);

	const optionsPercentage = {
		style: 'percent',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}

	const totalPrice = totalPromotionPrice.toFixed(2);
	const discountValue = (totalRegularPrice - totalPromotionPrice).toFixed(2);
	const discount = Intl.NumberFormat('pt-BR', optionsPercentage).format(1 - totalPrice / totalRegularPrice);

	return {
		totalPrice,
		discountValue,
		discount
	}
}

function getShoppingCart(ids, productsList) {
	const cartList = productsList.filter(product => ids.includes(product.id));

	const products = cartList.map(product => ({
		name: product.name,
		category: product.category
	}));

	const promotion = getPromotion(cartList);
	const { totalPrice, discountValue, discount } = getPrices(cartList, promotion);

	return {
		products,
		promotion,
		totalPrice,
		discountValue, 
		discount
	};
}

module.exports = { getShoppingCart };
