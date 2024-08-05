import React from 'react'
import AddOrderForm from '../../modules/AddOrderForm/AddOrderForm'
import GeneratePdfForm from '../../modules/GeneratePdfForm/GeneratePdfForm'
import cls from './Files.module.css'

const Files = () => {
	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Добавление заказа</h1>

			<div className={cls.addOrderCont}>
				<AddOrderForm />
			</div>

			<div>
				<GeneratePdfForm />
			</div>
		</section>
	)
}

export default Files
