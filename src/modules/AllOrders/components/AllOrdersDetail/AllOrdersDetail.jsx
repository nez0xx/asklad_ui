import React, { useState, forwardRef } from 'react'
import Modal from '../../../../UI/Modal/Modal'
import { useQuery, useMutation } from 'react-query'
import { Icon } from '@iconify/react/dist/iconify.js'
import { getOrderDetail } from '../../api/getOrderDetail'
import { giveOutOrder } from '../../api/giveOutOrder'
import Button from '../../../../UI/Button/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import cls from './AllOrdersDetail.module.css'

const AllOrdersDetail = ({ id, setId }, ref) => {
	const [textareaValue, setTextareaValue] = useState('')

	const { data, isLoading } = useQuery({
		queryKey: ['order-detail', id],
		queryFn: () => getOrderDetail({ id }),
		enabled: id !== undefined,
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

	let content
	if (isLoading) {
		content = (
			<Icon icon='eos-icons:bubble-loading' width='25px' height='25px' />
		)
	}

	if (data) {
		content = (
			<div className={cls.modalBody}>
				<h2>{data.order_id}</h2>
				<div className={cls.modalBodyInfo}>
					<p>Customer phone: {data?.customer_phone}</p>
					<p>Customer name: {data?.customer_name}</p>
					<p>Customer id: {data?.customer_id}</p>
					<table className={cls.table}>
						<thead>
							<tr>
								<th>Название</th>
								<th>Количество</th>
							</tr>
						</thead>
						<tbody>
							{data.products.map((product) => (
								<tr key={product.id}>
									<td>{product.title}</td>
									<td>{product.amount}</td>
								</tr>
							))}
						</tbody>
					</table>
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
			</Modal>
			<ToastContainer />
		</>
	)
}

export default forwardRef(AllOrdersDetail)
