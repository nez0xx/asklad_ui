import React from 'react'
import RegisterForm from '../../modules/Register/components/RegisterForm/RegisterForm'
import cls from './Register.module.css'
import { Header } from '../../UI/Header/Header'

const Register = () => {
	return (
		<div className='wrapper'>
			<Header />

			<div className={cls.registerFormCont}>
				<RegisterForm />
			</div>
		</div>
	)
}

export default Register
