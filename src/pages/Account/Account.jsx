import React from 'react'
import AccountInput from './components/AccountInput/AccountInput'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { changeName } from './api/changeName'
import { changePassword } from './api/changePassword'
import Button from '../../UI/Button/Button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cls from './Account.module.css'

const Account = () => {
	const user = JSON.parse(localStorage.getItem('user'))

	const [name, setName] = React.useState(user.name)
	const [password, setPassword] = React.useState('--------')
	const [newPassword, setNewPassword] = React.useState('')

	const [passwordClicked, setPasswordClicked] = React.useState(false)

	const { mutate: mutateName } = useMutation(changeName, {
		onSuccess: () => {
			toast.success('Имя успешно изменено', {
				autoClose: 1000,
			})
		},
		onError: () => {
			toast.error('Ошибка при изменении имени', {
				autoClose: 1000,
			})
		},
	})

	const { mutate: mutatePassword } = useMutation(changePassword, {
		onSuccess: () => {
			toast.success('Пароль успешно изменен', {
				autoClose: 1000,
			})
		},
		onError: () => {
			toast.error('Ошибка при изменении пароля', { autoClose: 1000 })
		},
	})

	const saveChanges = () => {
		if (name !== user.name) {
			const newUser = { ...user, name }
			localStorage.setItem('user', JSON.stringify(newUser))
			mutateName(name)
		}

		console.log('Hello', passwordClicked)
		if (passwordClicked) {
			mutatePassword({ password, new_password: newPassword })
		}

		setEnterNewPassword(false)
		setNewPassword('')
		setPassword('--------')
	}

	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Личный кабинет</h1>
			<p className={cls.info}>Информация об аккаунте</p>
			<div className={cls.inputs}>
				<AccountInput type='email' value={user.email} />
				<AccountInput type='name' value={name} setValue={setName} />
				<AccountInput
					type='password'
					value={password}
					setValue={setPassword}
					setPasswordClicked={setPasswordClicked}
				/>
				{passwordClicked && (
					<AccountInput
						type='new_password'
						value={newPassword}
						setValue={setNewPassword}
					/>
				)}
			</div>
			<Button onClick={saveChanges} className={cls.button}>
				Сохранить
			</Button>
		</section>
	)
}

export default Account
