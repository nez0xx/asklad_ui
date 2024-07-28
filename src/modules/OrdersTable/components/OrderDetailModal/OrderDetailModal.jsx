import React, { forwardRef, useRef, useState } from 'react'
import Modal from '../../../../UI/Modal/Modal'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getOrderDetail } from '../../api/getOrderDetail'
import Button from '../../../../UI/Button/Button'

import cls from './OrderDetailModal.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import { giveOutOrder } from '../../api/giveOutOrder'
import { toast, ToastContainer } from 'react-toastify'
import ChangeProductAmountModal from '../ChangeProductAmountModal/ChangeProductAmountModal'

let content

const toastId = 'give-out-toast'
const OrderDetailModal = ({ id, setId }, ref) => {
	const [textareaValue, setTextareaValue] = useState('')

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['order-detail', id],
		queryFn: () => getOrderDetail({ id }),
		enabled: id !== undefined,
		onError: (error) => {
			toast.error(error.message, {
				autoClose: 1000,
				containerId,
				toastId,
			})
		},
	})

	const { mutate, isLoading: isMutating } = useMutation(giveOutOrder, {
		onSuccess: () => {
			toast.success('Заказ выдан успешно')
		},
		onError: (error) => {
			toast.error('Ошибка при выдаче заказа')
			console.error(error)
		},
	})

	const handleGiveOutOrder = () => {
		mutate({ id, comment: textareaValue })
		ref.current.close()
		setId(undefined)
		setTextareaValue('')
	}

	const productAmountModal = useRef(null)
	const [selectedProduct, setSelectedProduct] = useState()

	function openModal(product) {
		setSelectedProduct(product)
		productAmountModal.current.showModal()
	}

	if (isLoading) {
		content = (
			<Icon icon='eos-icons:bubble-loading' width='25px' height='25px' />
		)
	}

	if (isError) {
		content = <p>{error.message}</p>
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
													product_id: product.product_id,
												})
											}
										>
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
				<div className={cls.buttons}>
					<Button onClick={handleGiveOutOrder} disabled={isMutating}>
						{isMutating ? 'Processing...' : 'Выдать'}
					</Button>
					<textarea
						value={textareaValue}
						onChange={(e) => setTextareaValue(e.target.value)}
						placeholder='Ваш комментарий'
						className={cls.textarea}
					/>
				</div>
			</div>
		)
	}

	return (
		<>
			<Modal ref={ref} onClose={() => setId(undefined)}>
				{content}
				<ChangeProductAmountModal
					ref={productAmountModal}
					product={selectedProduct}
				/>
			</Modal>
			<ToastContainer />
		</>
	)
}

export default forwardRef(OrderDetailModal)
