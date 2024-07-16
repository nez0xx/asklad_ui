import React from 'react';
import AddOrderForm from '../../modules/AddOrderForm/AddOrderForm';
import cls from './AddOrder.module.css'

const AddOrder = () => {
	return (
		<section className='wrapper'>
			<h1 className={cls.sectionTitle}>Добавление заказа</h1>
			<AddOrderForm />
		</section>
	);
};

export default AddOrder;
