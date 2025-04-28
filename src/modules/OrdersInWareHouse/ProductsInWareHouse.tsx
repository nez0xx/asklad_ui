import React, { useState } from 'react'
import cls from './OrdersInWareHouse.module.css'
import ProductsInWareHouseTable from './components/ProductsInWareHouseTable/ProductsInWareHouseTable'

const ProductsInWareHouse = () => {
	const [isExpanded, setIsExpanded] = useState(true)

	const handleToggle = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className={cls.OrdersInWareHouse}>
			<div className={`${cls.ordersCont} ${isExpanded ? cls.show : cls.hide}`}>
			<ProductsInWareHouseTable />
			</div>
		</div>
	)
}

export default ProductsInWareHouse
