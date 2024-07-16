import React from 'react';
import Employee from './components/Employee/Employee';

import cls from './Employees.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';

const Employees = ({ data }) => {
	return (
		<div className={cls.Employees}>
			<h2>Сотрудники</h2>
			<hr />
			<div className={cls.employeesCont}>
				{data?.map((employee) => (
					<Employee key={employee.id} name={employee?.employee?.name} />
				))}
				<button className={cls.addButton}>
					<Icon icon='oi:plus' width='25px' height='25px' color='#020E7A' />
				</button>
			</div>
		</div>
	);
};

export default Employees;
