import React from 'react'
import AddOrderForm from '../../modules/AddOrderForm/AddOrderForm'
import cls from './AddOrder.module.css'

const AddOrder = () => {
	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Добавление заказа</h1>

			<AddOrderForm />
		</section>
	)
}

export default AddOrder
