import React from 'react'
import cls from './IssuanceTable.module.css'

export const IssuanceTable = () => {
	return (
		<table className={cls.table}>
			<thead>
				<tr>
					<th></th>
					<th>ID</th>
					<th>Статус</th>
				</tr>
			</thead>
			<tbody>
				{[].map((order, index) => (
					<tr key={order.id}>
						<td onClick={() => {}}>{index + 1}</td>
						<td onClick={() => {}}>{order.id}</td>
						<td onClick={() => {}}>
							{' '}
							<div
								className={
									order.isIssued ? 'banner giveOut' : 'banner onTheWay'
								}
							>
								{order.delivered ? 'Выдан' : 'Не выдан'}
							</div>
						</td>
					</tr>
				))}

				{/* temporary usage of [] */}
			</tbody>
		</table>
	)
}
