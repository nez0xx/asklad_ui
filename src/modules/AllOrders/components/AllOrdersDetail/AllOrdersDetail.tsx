import  { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import { Icon } from '@iconify/react/dist/iconify.js'
import { getOrderDetail } from '../../api/getOrderDetail'
import { giveOutOrder } from '../../api/giveOutOrder'
import Button from '@UI/Button/Button'
import ChangeAmountModal from '../ChangeAmountModal/ChangeAmountModal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cls from './AllOrdersDetail.module.css'

const toastId = 'give-out-toast'

const AllOrdersDetail = ({ id, setId, setOpen }) => {
	const [textareaValue, setTextareaValue] = useState('')
	const [selectedProduct, setSelectedProduct] = useState()
	const [isDetailsVisible, setIsDetailsVisible] = useState(true)
	const [isChangeAmountModalOpen, setChangeAmountModalOpen] = useState(false)

	const { data, isLoading } = useQuery({
		queryKey: ['order-detail', id],
		queryFn: () => getOrderDetail({ id }),
		enabled: id !== undefined,
	})

	const convertFullName = (fullName) => {
		const lowerCaseName = fullName.toLowerCase()
		const words = lowerCaseName.split(' ')
		const capitalizedWords = words.map((word) => {
			if (word.length === 0) return ''
			return word[0].toUpperCase() + word.slice(1)
		})
		return capitalizedWords.join(' ')
	}

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
	}

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

	if (!isDetailsVisible) return null

	let content
	if (isLoading) {
		content = (
			<Icon icon='eos-icons:bubble-loading' width='25px' height='25px' />
		)
	}

	if (data) {
		content = (
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
					{data?.given_by && (
						<p>Сотрудник: {convertFullName(data?.given_by)}</p>
					)}
					{data?.comment && <p>Комментарий: {data?.comment}</p>}
					<table className={cls.table}>
						<thead>
							<tr>
								<th>Название</th>
								<th>Количество</th>
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
				)}
			</div>
		)
	}

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

export default AllOrdersDetail
