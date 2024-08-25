import React, { useState } from 'react'
import cls from './OrdersInWareHouse.module.css'
import { useQuery } from 'react-query'
import { getAllProducts } from './api/getAllProducts'
import { Icon } from '@iconify/react/dist/iconify.js'
import ProductsInWareHouseTable from './components/ProductsInWareHouseTable/ProductsInWareHouseTable'

const ProductsInWareHouse = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['all-products'],
		queryFn: getAllProducts,
	})

	let content
	if (isLoading) {
		content = (
			<Icon icon='eos-icons:bubble-loading' width='25px' height='25px' />
		)
	}

	if (isError) {
		content = <p>Can't load products</p>
	}

	if (data) {
		content = <ProductsInWareHouseTable data={data} />
	}

	const [isExpanded, setIsExpanded] = useState(true)

	const handleToggle = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className={cls.OrdersInWareHouse}>
			<h2
				className={`${cls.secondaryTitle} ${
					isExpanded ? cls.expandedTitle : ''
				}`}
				onClick={handleToggle}
			>
				<div>Товары на складе</div>
				<div
					className={`${cls.titleIcon} ${isExpanded ? '' : cls.expandedIcon}`}
				>
					<Icon
						icon='mdi:chevron-down'
						width='25px'
						height='25px'
						color='#1f1f1f'
					/>
				</div>
			</h2>

			<div className={`${cls.ordersCont} ${isExpanded ? cls.show : cls.hide}`}>
				{content}
			</div>
		</div>
	)
}

export default ProductsInWareHouse
