import React from 'react'
import Header from '../../modules/Header/Header'
import ResetPasswordForm from '../../modules/ResetPasswordForm/ResetPasswordForm'

import cls from './ResetPassword.module.css'

const ResetPassword = () => {
	return (
		<div className='wrapper'>
			<Header />

			<div className={cls.resetPasswordCont}>
				<ResetPasswordForm />
			</div>
		</div>
	)
}

export default ResetPassword
