import React from 'react'
import cls from './FinanceTable.module.css'

export const FinanceTable = () => {
	return (
		<table className={cls.table}>
			<thead>
				<tr>
					<th></th>
					<th>Консолидированный заказ</th>
					<th>Сумма</th>
				</tr>
			</thead>
			<tbody>
				{[].map((order, index) => (
					<tr key={order.id}>
						<td onClick={() => {}}>{index + 1}</td>
						<td onClick={() => {}}>{order.id}</td>
						<td onClick={() => {}}>{order.amount}</td>
					</tr>
				))}

				{/* temporary usage of [] */}
			</tbody>
		</table>
	)
}
