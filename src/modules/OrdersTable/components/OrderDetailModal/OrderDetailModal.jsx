import React, { forwardRef, useRef, useState, useEffect } from 'react'
import Modal from '../../../../UI/Modal/Modal'
import { useMutation, useQuery } from 'react-query'
import { getOrderDetail } from '../../api/getOrderDetail'
import Button from '../../../../UI/Button/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { giveOutOrder } from '../../api/giveOutOrder'
import { toast, ToastContainer } from 'react-toastify'
import ChangeAmountModal from '../ChangeAmountModal/ChangeAmountModal'
import cls from './OrderDetailModal.module.css'

const toastId = 'give-out-toast'
const containerId = 'give-out-toast-container'

const OrderDetailModal = ({ id, setId }, ref) => {
	const productAmountModal = useRef(null)
	const [textareaValue, setTextareaValue] = useState('')
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [content, setContent] = useState(null)

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['order-detail', id],
		queryFn: () => getOrderDetail({ id }),
		enabled: !!id,
		onError: (error) => {
			if (!toast.isActive(toastId)) {
				toast.error(error.message, {
					autoClose: 1000,
					containerId,
					toastId,
				})
			}
		},
	})

	const { mutate, isLoading: isMutating } = useMutation(giveOutOrder, {
		onSuccess: () => {
			toast.success('Заказ выдан успешно', {
				autoClose: 1000,
				toastId,
			})
		},
		onError: (error) => {
			if (!toast.isActive(toastId)) {
				toast.error(error?.response?.data?.detail || 'Неизвестная ошибка', {
					autoClose: 1000,
					toastId,
				})
			}
		},
	})

	const handleGiveOutOrder = () => {
		mutate({ id, comment: textareaValue })
		ref.current.close()
		setId(undefined)
		setTextareaValue('')
	}

	const openModal = (product) => {
		setSelectedProduct(product)
		productAmountModal.current.showModal()
	}

	useEffect(() => {
		if (isLoading) {
			setContent(
				<Icon icon='eos-icons:bubble-loading' width='25px' height='25px' />
			)
		} else if (isError) {
			setContent(<p>{error.message}</p>)
		} else if (data) {
			setContent(
				<div className={cls.modalBody}>
					<h2>{data.order_id}</h2>
					<div className={cls.modalBodyInfo}>
						<p>Телефон пользователя: {data?.customer_phone}</p>
						<p>Имя пользователя: {data?.customer_name}</p>
						<p>ID пользователя: {data?.customer_id}</p>
						{data?.given_by && <p>Сотрудник: {data?.given_by}</p>}
						{data?.comment && <p>Комментарий: {data?.comment}</p>}
						<table className={cls.table}>
							<thead>
								<tr>
									<th>Название</th>
									<th>Количество</th>
									<th>Действие</th>
								</tr>
							</thead>
							<tbody>
								{data.products.map((product) => (
									<tr key={product.product_id}>
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
						</table>
					</div>
					{!data.given_by && (
						<div className={cls.buttons}>
							<Button onClick={handleGiveOutOrder} disabled={isMutating}>
								{isMutating ? 'Processing...' : 'Выдать'}
							</Button>
							<textarea
								value={textareaValue}
								onChange={(e) => setTextareaValue(e.target.value)}
								placeholder='Ваш комментарий'
								className={cls.textarea}
							/>
						</div>
					)}
				</div>
			)
		}
	}, [data, isLoading, isError, error, isMutating, textareaValue])

	return (
		<>
			<Modal ref={ref} onClose={() => setId(undefined)}>
				{content}
				<ChangeAmountModal ref={productAmountModal} product={selectedProduct} />
			</Modal>
			<ToastContainer containerId={containerId} />
		</>
	)
}

export default forwardRef(OrderDetailModal)
