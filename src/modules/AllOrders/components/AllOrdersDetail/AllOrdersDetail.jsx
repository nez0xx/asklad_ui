import React, { forwardRef } from 'react';
import Modal from '../../../../UI/Modal/Modal';
import { useQuery } from 'react-query';
import { Icon } from '@iconify/react/dist/iconify.js';
import { getOrderDetail } from '../../api/getOrderDetail';

import cls from './AllOrdersDetail.module.css';

let content;
const AllOrdersDetail = ({ id, setId }, ref) => {
	const { data, isLoading } = useQuery({
		queryKey: ['order-detail', id],
		queryFn: () => getOrderDetail({ id }),
		enabled: id !== undefined,
	});

	if (isLoading) {
		content = (
			<Icon icon='eos-icons:bubble-loading' width='25px' height='25px' />
		);
	}

	if (data) {
		content = (
			<div className={cls.modalBody}>
				<h2>{data.order_id}</h2>
				<div className={cls.modalBodyInfo}>
					<p>Customer phone: {data?.customer_phone}</p>
					<p>Customer name: {data?.customer_name}</p>
					<p>Customer id: {data?.customer_id}</p>
					<tabel className={cls.table}>
						<thead>
							<tr>
								<th>Название</th>
								<th>Количество</th>
							</tr>
						</thead>
						<tbody>
							{data.products.map((product) => (
								<tr>
									<td>{product.title}</td>
									<td>{product.amount}</td>
								</tr>
							))}
						</tbody>
					</tabel>
				</div>
			</div>
		);
	}

	return (
		<Modal ref={ref} onClose={() => setId(undefined)}>
			{content}
		</Modal>
	);
};

export default forwardRef(AllOrdersDetail);
