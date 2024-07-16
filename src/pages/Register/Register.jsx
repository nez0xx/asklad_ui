import React from 'react'
import cls from './Register.module.css'
import RegisterForm from '../../modules/Register/components/RegisterForm/RegisterForm'

const Register = () => {
  return (
    <div className='wrapper'>
			<div className={cls.registerFormCont}>
				<RegisterForm />
			</div>
		</div>
  )
}

export default Register