import React, { forwardRef, useState, useEffect } from 'react'
import Modal from '../../../../UI/Modal/Modal'
import { useMutation, useQuery } from 'react-query'
import { getOrderDetail } from '../../api/getOrderDetail'
import Button from '../../../../UI/Button/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { giveOutOrder } from '../../api/giveOutOrder'
import { toast } from 'react-toastify'
import ChangeAmountModal from '../ChangeAmountModal/ChangeAmountModal'
import cls from './OrderDetailModal.module.css'

const toastId = 'give-out-toast'

const OrderDetailModal = ({ id, setId, setOpen }) => {
	const [textareaValue, setTextareaValue] = useState('')
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [isDetailsVisible, setIsDetailsVisible] = useState(true)
	const [isChangeAmountModalOpen, setChangeAmountModalOpen] = useState(false)
	const [content, setContent] = useState(null)

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['order-detail', id],
		queryFn: () => getOrderDetail({ id }),
		enabled: !!id,
		onError: (error) => {
			toast.error(error.message, {
				autoClose: 1000,
				toastId,
			})
		},
	})

	const { mutate, isLoading: isMutating } = useMutation(giveOutOrder, {
		onSuccess: () => {
			toast.success('Заказ выдан успешно', {
				autoClose: 1000,
				toastId,
			})
			setIsDetailsVisible(false)
			setId(null)
			setOpen(false)
			setTextareaValue('')
		},
		onError: (error) => {
			toast.error(error?.response?.data?.detail || 'Неизвестная ошибка', {
				autoClose: 1000,
				toastId,
			})
		},
	})

	const openProductAmountModal = (product) => {
		setSelectedProduct(product)
		setChangeAmountModalOpen(true)
	}

	const closeProductAmountModal = () => {
		setChangeAmountModalOpen(false)
		setSelectedProduct(null)
	}

	useEffect(() => {
		if (id !== undefined) {
			setIsDetailsVisible(true)
			document.body.style.overflow = 'hidden'
		} else {
			setIsDetailsVisible(false)
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [id])

	const convertFullName = (fullName) => {
		const lowerCaseName = fullName.toLowerCase()
		const words = lowerCaseName.split(' ')
		const capitalizedWords = words.map((word) => {
			if (word.length === 0) return ''
			return word[0].toUpperCase() + word.slice(1)
		})
		return capitalizedWords.join(' ')
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
					<div className={cls.header}>
						<h2>
							<div>{data.order_id}</div>
							<div
								onClick={() => {
									setOpen(false)
									setId(null)
								}}
							>
								X
							</div>
						</h2>
					</div>
					<div className={cls.modalBodyInfo}>
						<p>Телефон пользователя: {data?.customer_phone}</p>
						<p>Имя пользователя: {convertFullName(data?.customer_name)}</p>
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
													openProductAmountModal({
														title: product.title,
														amount: product.amount,
														order_id: data.order_id,
														product_id: product.product_id,
													})
												}
											>
												<Icon
													icon='solar:pen-2-linear'
													width='25px'
													height='25px'
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
							<Button
								onClick={() => mutate({ id, comment: textareaValue })}
								disabled={isMutating}
							>
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

	if (!isDetailsVisible) return null

	return (
		<>
			<div className={cls.detailsContainer}>
				<div className={cls.innerDiv}>{content}</div>
			</div>
			{isChangeAmountModalOpen && (
				<ChangeAmountModal
					product={selectedProduct}
					onClose={closeProductAmountModal}
				/>
			)}
		</>
	)
}

export default OrderDetailModal
