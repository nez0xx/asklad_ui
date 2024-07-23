import React from 'react'
import cls from './OrdersInWareHouseTable.module.css'

const ProductsInWareHouseTable = ({ data }) => {
	return (
		<>
			{data.length > 0 ? (
				<table className={cls.table}>
					<thead>
						<tr>
							<th></th>
							<th>Товар</th>
							<th>Количество</th>
						</tr>
					</thead>
					<tbody>
						{data.map((product, index) => (
							<tr>
								<td>{index + 1}</td>
								<td>{product.title}</td>
								<td>{product.amount}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>Продуктов нет</p>
			)}
		</>
	)
}

export default ProductsInWareHouseTable
