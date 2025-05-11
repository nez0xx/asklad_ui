import React from 'react'
import AddOrderForm from '@modules/AddOrderForm/AddOrderForm'
import GeneratePdfForm from '@modules/GeneratePdfForm/GeneratePdfForm'
import cls from './Files.module.css'
import { ToastContainer } from 'react-toastify'

const Files = () => {
	return (
		<section className={cls.section}>
			<ToastContainer
				containerId="main-toast-container"
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<h1 className={cls.title}>Добавление заказа</h1>
			<div className={cls.addOrderCont}>
				<AddOrderForm />
			</div>

			<h1 className={cls.title}>Сжатие накладных</h1>
			<div>
				<GeneratePdfForm />
			</div>
		</section>
	)
}

export default Files
