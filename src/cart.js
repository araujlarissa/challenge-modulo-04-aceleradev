const promotions = ['FULL LOOK','TRIPLE LOOK', 'DOUBLE LOOK', 'SINGLE LOOK'];
const categorys = ['T-SHIRTS', 'PANTS', 'SHOES', 'BAGS'];

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

	/* Retorna somente o nome e a categoria do produto */
	return selectProducts;
}

function calcPromotion(products) {
	const qtd_category = [];
	let promotion = '';

	/**
	 * Percorre o array das 4 categorias e filtra a quantidade de cada categoria
	 * dos produtos selecionados
	 */
	categorys.map(category => {
		const filter = products.filter(product => product.category === category);

		qtd_category.push(filter.length);
	});

	/* Verifica qual é a promoção aplicada de acordo com a quantidade de categorias */
	let i = 3;
	qtd_category.map(qtd => {
		if (qtd === 4 || qtd === 3 || qtd === 2 || qtd === 1) {
			promotion = promotions[i];
		}

		i--;
	});

	return promotion;
}

function calcTotalPrice(ids, data, promotion) {
	const prices = [];
	const pricesRegular = [];
	let price = 0;

	/**
	 * Percorre o produto e seu preço regular,
	 * caso exista uma promoção, se aplica o preço promocional
	 * em vez do preço regular.
	 */
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

	/**
	 * Calcula o preço total, o valor de desconto e a porcentagem do desconto
	 */
	var totalPrice = prices.reduce((total, num) => total + num, 0);
	var totalPriceRegular = pricesRegular.reduce((total, num) => total + num, 0);
	
	var discountValue = totalPriceRegular - totalPrice;
	var discountPercent = (discountValue * 100)/totalPriceRegular;

	var discount = discountPercent.toFixed(2) + '%';

	return [ totalPrice.toFixed(2), discountValue.toFixed(2), discount ];
}

function getShoppingCart(ids, listProducts) {
	const products = formatProduct(ids, listProducts);
	const promotion = calcPromotion(products);
	const [ totalPrice, discountValue, discount ] = calcTotalPrice(ids, listProducts, promotion);
	
	/* Retorna um objeto com todas as informações do carrinho */
	return {
		products,
		promotion,
		totalPrice,
		discountValue,
		discount
	};
}

module.exports = getShoppingCart;
