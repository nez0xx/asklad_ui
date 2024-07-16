import React, { forwardRef, useEffect, useState } from 'react';
import Modal from '../../../../UI/Modal/Modal';
import Input from '../../../../UI/Input/Input';

import cls from './ChangeProductAmountModal.module.css';
import Button from '../../../../UI/Button/Button';
import { useMutation, useQueryClient } from 'react-query';
import { changeProductAmount } from '../../api/changeProductAmount';
import { toast, ToastContainer } from 'react-toastify';

const containerId = 'change-amount-toast-container';
const toastId = 'change-amount-toast';
const ChangeProductAmountModal = ({ product }, ref) => {
	const [productAmountModal, setProductAmountModal] = useState(0);
	const queryClient = useQueryClient()
	const { mutate, isLoading } = useMutation({
		mutationFn: changeProductAmount,
		onSuccess: (data) => {
			toast.update(toastId, {
				render: 'Success',
				type: 'success',
				containerId,
				isLoading: false,
				autoClose: 1000,
			});
			queryClient.invalidateQueries(['consolodated-order-orders'])
		},
		onError: () => {
			toast.update(toastId, {
				render: 'Failed',
				type: 'error',
				containerId,
				isLoading: false,
				autoClose: 1000,
			});
		},
	});

	useEffect(() => {
		if (product?.amount) setProductAmountModal(product.amount);
	}, [product]);

	function handleSave() {
		mutate({ ...product, amount: productAmountModal });
	}

	if (isLoading) {
		toast('Loading', {
			toastId,
			containerId,
			isLoading: true,
		});
	}

	return (
		<Modal ref={ref}>
			<div className={cls.modalBody}>
				<h3>{product?.title}</h3>
				<Input
					value={productAmountModal}
					onChange={(e) => setProductAmountModal(e.target.value)}
				/>
				<Button onClick={handleSave}>Сохранить</Button>
			</div>
			<ToastContainer containerId={containerId} />
		</Modal>
	);
};

export default forwardRef(ChangeProductAmountModal);
