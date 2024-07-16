import React from 'react';
import cls from './Employee.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';

const Employee = ({name}) => {
	return (
		<div className={cls.employeeCont}>
			<div className={cls.employee}>
				<div className={cls.employeePhoto} />
				<p>{name}</p>
			</div>
			<button className={cls.deleteButton}>
				<Icon icon='ep:delete' width='25px' height='25px' />
			</button>
		</div>
	);
};

export default Employee;
