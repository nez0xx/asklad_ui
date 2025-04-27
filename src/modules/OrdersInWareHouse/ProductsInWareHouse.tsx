import React, { useEffect, useState } from 'react'
import cls from './OrdersInWareHouse.module.css'
import { useQuery } from 'react-query'
import { getAllProducts } from './api/getAllProducts'
import { Icon } from '@iconify/react/dist/iconify.js'
import ProductsInWareHouseTable from './components/ProductsInWareHouseTable/ProductsInWareHouseTable'
import useProductsInWareHouse from '@/store/productsInWareHouseStore'
import Pagination from '@/UI/Pagination/Pagination'
import { sortDataByDate } from '@/utils/sortDatabyDate'
import { getSwitchUtilityClass } from '@mui/material'
import { getWarehousePage } from '../WareHouseContent/api/getWarehousePage'

const ProductsInWareHouse = () => {
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
			<ProductsInWareHouseTable />
			</div>
		</div>
	)
}

export default ProductsInWareHouse
