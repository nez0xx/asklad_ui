import React from 'react'
import cls from './FinanceTable.module.css'

export const FinanceTable = ({ orders }) => {
	console.log(orders)
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
				{orders.map((order, index) => (
					<tr className={cls.row} key={order[0]}>
						<td onClick={() => {}}>{index + 1}</td>
						<td onClick={() => {}}>{order[0]}</td>
						<td onClick={() => {}}>{order[1].rub} ₽</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
