import React from 'react'
import Header from '../../modules/Header/Header'
import ResetPasswordForm from '../../modules/ResetPasswordForm/ResetPasswordForm'
import { useParams } from 'react-router-dom'
import cls from './ResetPassword.module.css'

const ResetPassword = () => {
	const { token } = useParams()

	return (
		<div>
			<Header />

			<div className={cls.resetPasswordCont}>
				<ResetPasswordForm token={token} />
			</div>
		</div>
	)
}

export default ResetPassword
