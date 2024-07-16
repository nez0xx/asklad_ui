import React, { useState } from 'react';
import Button from '../../../../UI/Button/Button';
import { useMutation, useQueryClient } from 'react-query';
import Input from '../../../../UI/Input/Input';

import cls from './NoWarehouse.module.css';
import { createWarehouse } from '../../api/createWarehouse';
import { toast, ToastContainer } from 'react-toastify';

const containerId = 'create-warehouse-toast-container';
const toastId = 'create-warehouse-toast';
const NoWarehouse = () => {
	const [warehouseNameValue, setWarehouseNameValue] = useState('');
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: createWarehouse,
		onSuccess: () => {
			queryClient.invalidateQueries(['warehouse']);
		},
		onError: () => {
			toast.update(toastId, {
				containerId,
				isLoading: false,
				type: 'error',
				render: 'Failed to create',
			});
		},
	});

	function handleCreateWarehouse() {
		mutate(warehouseNameValue);
		toast('Creating...', {
			containerId,
			toastId,
			isLoading: true,
		});
	}

	return (
		<div className={cls.NoWarehouse}>
			<Input
				label={'Warehouse name'}
				value={warehouseNameValue}
				onChange={(e) => setWarehouseNameValue(e.target.value)}
			/>
			<Button onClick={handleCreateWarehouse}>Create warehouse</Button>
			<ToastContainer containerId={containerId} />
		</div>
	);
};

export default NoWarehouse;
