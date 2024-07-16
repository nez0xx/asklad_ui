import React from 'react';
import cls from './OrdersInWareHouseTable.module.css';

const ProductsInWareHouseTable = ({ data }) => {
	return (
		<>
			{data.length > 0 ? (
				<table className={cls.table}>
					<thead>
						<tr>
							<th></th>
							<th className={cls.center}>Товар</th>
							<th className={cls.center}>Количество</th>
						</tr>
					</thead>
					<tbody>
						{data.map((product, index) => (
							<>
								<tr>
									<td className={cls.center}>{index + 1}</td>
									<td>{product.title}</td>
									<td className={cls.center}>{product.amount}</td>
								</tr>
							</>
						))}
					</tbody>
				</table>
			) : (
				<p>Продуктов нет</p>
			)}
		</>
	);
};

export default ProductsInWareHouseTable;
