import React, { forwardRef, useRef, useState } from 'react';
import Modal from '../../../../UI/Modal/Modal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getOrderDetail } from '../../api/getOrderDetail';
import Button from '../../../../UI/Button/Button';

import cls from './OrderDetailModal.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { giveOutOrder } from '../../api/giveOutOrder';
import { toast, ToastContainer } from 'react-toastify';
import ChangeProductAmountModal from '../ChangeProductAmountModal/ChangeProductAmountModal';

let content;
const containerId = 'give-out-toast-container';
const toastId = 'give-out-toast';
const OrderDetailModal = ({ id, setId }, ref) => {
	const queryClient = useQueryClient();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['order-detail', id],
		queryFn: () => getOrderDetail({ id }),
		enabled: id !== undefined,
		onError: (error) => {
			toast.error(error.message, {
				autoClose: 1000,
				containerId,
				toastId,
			});
		},
	});

	const { mutate, isLoading: giveOutLoading } = useMutation({
		mutationFn: giveOutOrder,
		onError: (data) => {
			toast.update(toastId, {
				type: 'error',
				autoClose: 1000,
				containerId,
				render: data.response.data.detail,
				isLoading: false,
			});
		},
		onSuccess: () => {
			toast.update(toastId, {
				type: 'success',
				autoClose: 1000,
				containerId: containerId,
				render: 'Success',
				isLoading: false,
			});
			queryClient.invalidateQueries(['consolodated-order-orders']);
		},
	});

	async function handleGiveOutOrder(id) {
		mutate(id);
	}

	const productAmountModal = useRef(null);
	const [selectedProduct, setSelectedProduct] = useState();

	function openModal(product) {
		setSelectedProduct(product);
		productAmountModal.current.showModal();
	}

	if (giveOutLoading) {
		toast('Loading', {
			containerId,
			toastId,
			isLoading: true,
		});
	}

	if (isLoading) {
		content = (
			<Icon icon='eos-icons:bubble-loading' width='25px' height='25px' />
		);
	}

	if (isError) {
		content = <p>{error.message}</p>;
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
									<td className={cls.editTd}>
										<button
											onClick={() =>
												openModal({
													title: product.title,
													amount: product.amount,
													order_id: data.order_id,
													product_id: product.product_id
												})
											}>
											<Icon
												icon='solar:pen-2-linear'
												width='30px'
												height='30px'
											/>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</tabel>
				</div>
				<Button
					className={cls.deleteBtn}
					onClick={() => handleGiveOutOrder(data.order_id)}>
					Выдать
				</Button>
			</div>
		);
	}

	return (
		<Modal ref={ref} onClose={() => setId(undefined)}>
			{content}
			<ToastContainer containerId={containerId} />
			<ChangeProductAmountModal
				ref={productAmountModal}
				product={selectedProduct}
			/>
		</Modal>
	);
};

export default forwardRef(OrderDetailModal);
