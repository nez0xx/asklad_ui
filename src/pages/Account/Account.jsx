import React from 'react'
import AccountInput from './components/AccountInput/AccountInput'
import cls from './Account.module.css'

const Account = () => {
	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Личный кабинет</h1>

			<p className={cls.info}>Информация об аккаунте</p>

			<div className={cls.inputs}>
				<AccountInput type='email' value='user@gmail.com' />
				<AccountInput type='name' value='User Name' />
				<AccountInput type='password' value='12345' />
			</div>
		</section>
	)
}

export default Account
