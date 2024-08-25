import  { useEffect, useState } from 'react'
import Input from '@UI/Input/Input'
import Button from '@UI/Button/Button'
import { useMutation, useQueryClient } from 'react-query'
import { changeProductAmount } from '../../api/changeProductAmount'
import cls from './ChangeAmountModal.module.css'

const ChangeAmountModal = ({ product, onClose }) => {
	const [productAmountModal, setProductAmountModal] = useState(0)
	const queryClient = useQueryClient()
	const { mutate, isLoading } = useMutation({
		mutationFn: changeProductAmount,
		onSuccess: () => {
			queryClient.invalidateQueries(['consolidated-order-orders'])
			if (onClose) onClose()
		},
		onError: () => {},
	})

	useEffect(() => {
		if (product?.amount) setProductAmountModal(product.amount)
	}, [product])

	function handleSave() {
		mutate({ ...product, amount: productAmountModal })
	}

	function handleClose() {
		if (onClose) onClose()
	}

	return (
		<div className={cls.detailsContainer}>
			<div className={cls.innerDiv}>
				<div className={cls.modalBody}>
					<div className={cls.header}>
						<h3 className={cls.title}>
							<div>{product?.title}</div>
							<button className={cls.closeButton} onClick={handleClose}>
								X
							</button>
						</h3>
					</div>
					<div className={cls.inputDiv}>
						<Input
							value={productAmountModal}
							onChange={(e) => setProductAmountModal(e.target.value)}
						/>
					</div>
					<div>
						<Button onClick={handleSave} disabled={isLoading}>
							{isLoading ? 'Сохранение...' : 'Сохранить'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChangeAmountModal
