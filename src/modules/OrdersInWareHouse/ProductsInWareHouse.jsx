import React from 'react';
import cls from './OrdersInWareHouse.module.css';
import { useQuery } from 'react-query';
import { getAllProducts } from './api/getAllProducts';
import { Icon } from '@iconify/react/dist/iconify.js';
import ProductsInWareHouseTable from './components/ProductsInWareHouseTable/ProductsInWareHouseTable';
let content;
const ProductsInWareHouse = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['all-products'],
		queryFn: getAllProducts,
	});

	if (isLoading) {
		content = (
			<Icon icon='eos-icons:bubble-loading' width='25px' height='25px' />
		);
	}

	if (isError) {
		content = <p>Can't load products</p>;
	}

	if (data) {
		content = <ProductsInWareHouseTable data={data} />;
	}

	return (
		<div className={cls.OrdersInWareHouse}>
			<h2>Товары на складе</h2>
			<hr />
			{content}
		</div>
	);
};

export default ProductsInWareHouse;
