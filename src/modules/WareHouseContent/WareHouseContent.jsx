import React, { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getWarehouse } from './api/getWarehouse'
import { Icon } from '@iconify/react/dist/iconify.js'
import ConsolidatedOrders from '../ConsolidatedOrders/ConsolidatedOrders'
import Employees from '../Employees/Employees'

import cls from './WareHouseContent.module.css'
import { changeWarehouseName } from './api/changeWarehouseName'
import Button from '../../UI/Button/Button'
import Modal from '../../UI/Modal/Modal'
import { deleteWarehouse } from './api/deleteWarrehouse'
import NoWarehouse from './components/NoWarehouse/NoWarehouse'
import { toast, ToastContainer } from 'react-toastify'
import ProductsInWareHouse from '../OrdersInWareHouse/ProductsInWareHouse'

const containerId = 'delete-warehouse-toast-container'
const toastId = 'delete-warehouse-toast'
const WareHouseContent = () => {
	const queryClient = useQueryClient()
	const confirmDeleteModalref = useRef(null)
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['warehouse'],
		queryFn: getWarehouse,
		refetchOnWindowFocus: false,
		retry: false,
	})

	const { mutate, isLoading: changeNameLoading } = useMutation({
		mutationFn: changeWarehouseName,
		onSuccess: () => {
			queryClient.invalidateQueries(['warehouse'])
			setIsEditName(false)
		},
		onError: () => {},
	})

	const { mutate: mutateDeleteWarehouse } = useMutation({
		mutationFn: deleteWarehouse,
		onSuccess: () => {
			queryClient.invalidateQueries(['warehouse'])
		},
		onError: () => [
			toast.update(toastId, {
				render: 'Failed delete',
				isLoading: false,
				containerId,
				type: 'error',
			}),
		],
	})

	const [nameInputValue, setNameInputValue] = useState('')
	const [isEditName, setIsEditName] = useState(false)

	function handleStartEdit() {
		setNameInputValue(data?.name || '')
		setIsEditName(true)
	}

	function handleSaveName() {
		mutate(nameInputValue)
	}

	function handleOpenDeleteModal() {
		confirmDeleteModalref.current.showModal()
	}

	function handleDeleteWarehouse() {
		mutateDeleteWarehouse()
		toast('Deleting...', {
			isLoading: true,
			toastId,
			containerId,
		})
	}

	if (isLoading) {
		return <Icon icon='eos-icons:bubble-loading' width='35px' height='35px' />
	}

	if (isError) {
		if (error?.response?.status == 404) {
			return <NoWarehouse />
		}
		return <p>Failed to load content</p>
	}

	return (
		<>
			<div className={cls.titleBlock}>
				{!isEditName ? (
					<>
						<div className={cls.title}>{data.name}</div>
						<button className={cls.titleIcon} onClick={handleStartEdit}>
							<Icon icon='solar:pen-2-linear' width='30px' height='30px' />
						</button>
					</>
				) : (
					<div className={cls.editCont}>
						<input
							className={`${cls.warehouseNameInput} ${cls.title}`}
							type='text'
							value={nameInputValue}
							style={{ maxWidth: `${nameInputValue.length}ch` }}
							onChange={(e) => setNameInputValue(e.target.value)}
						/>
						{changeNameLoading ? (
							<Icon
								icon='eos-icons:bubble-loading'
								width='30px'
								height='30px'
							/>
						) : (
							<button onClick={handleSaveName}>
								<Icon
									icon='mdi:success-circle'
									width='30px'
									height='30px'
									color='green'
								/>
							</button>
						)}
					</div>
				)}
			</div>

			<Employees data={data.employees_details} />
			<ConsolidatedOrders data={data.united_orders_relationship} />
			<ProductsInWareHouse />
			{/* <Button onClick={handleOpenDeleteModal} className={cls.deleteBtn}>
				Delete
			</Button> */}
			<Modal ref={confirmDeleteModalref}>
				<div className={cls.modalBody}>
					Are you sure?
					<div className={cls.modalBtns}>
						<Button onClick={handleDeleteWarehouse} className={cls.deleteBtn}>
							Delete
						</Button>
						<Button onClick={() => confirmDeleteModalref.current.close()}>
							Cancel
						</Button>
					</div>
				</div>
				<ToastContainer containerId={containerId} />
			</Modal>
		</>
	)
}

export default WareHouseContent
