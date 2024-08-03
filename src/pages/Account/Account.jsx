import React from 'react'
import AccountInput from './components/AccountInput/AccountInput'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { changeName } from './api/changeName'
import { getMe } from './api/getMe'
import { changePassword } from './api/changePassword'
import Button from '../../UI/Button/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cls from './Account.module.css'

const Account = () => {
	const queryClient = useQueryClient()
	const [name, setName] = React.useState('Loading')
	const [email, setEmail] = React.useState('Loading')
	const [initialName, setInitialName] = React.useState('')
	const [password, setPassword] = React.useState('--------')
	const [newPassword, setNewPassword] = React.useState('')
	const [enterNewPassword, setEnterNewPassword] = React.useState(false)
	const [isNameEditing, setNameEditing] = React.useState(false)
	const [isPasswordEditing, setPasswordEditing] = React.useState(false)
	const [isNewPasswordEditing, setNewPasswordEditing] = React.useState(false)
	const [resetPressed, setResetPressed] = React.useState(false)

	const { data, isLoading } = useQuery('getMe', getMe, {
		onSuccess: (data) => {
			setName(data.name)
			setInitialName(data.name)
			setEmail(data.email)
		},
	})

	const { mutate: mutateName } = useMutation(changeName, {
		onSuccess: () => {
			queryClient.invalidateQueries('getMe')
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
			queryClient.invalidateQueries('getMe')
			toast.success('Пароль успешно изменен', { autoClose: 1000 })
		},
		onError: () => {
			toast.error('Ошибка при изменении пароля', { autoClose: 1000 })
		},
	})

	const saveChanges = () => {
		if (name !== initialName) {
			mutateName(name)
		}

		if (resetPressed) {
			mutatePassword({ password, new_password: newPassword })
		}

		setNewPasswordEditing(false)
		setEnterNewPassword(false)
		setNameEditing(false)
		setPasswordEditing(false)
		setNewPassword('')
		setPassword('--------')
	}

	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Личный кабинет</h1>
			<p className={cls.info}>Информация об аккаунте</p>
			<div className={cls.inputs}>
				<AccountInput type='email' value={email} />
				<AccountInput
					type='name'
					value={name}
					setValue={setName}
					mutate={mutateName}
					isEditing={isNameEditing}
					setEditing={setNameEditing}
				/>
				<AccountInput
					type='password'
					value={password}
					setValue={setPassword}
					mutate={mutatePassword}
					setEnterNewPassword={setEnterNewPassword}
					isEditing={isPasswordEditing}
					setEditing={setPasswordEditing}
					setNewPasswordEditing={setNewPasswordEditing}
					setResetPressed={setResetPressed}
				/>
				{enterNewPassword && (
					<AccountInput
						type='new_password'
						value={newPassword}
						setValue={setNewPassword}
						isEditing={isNewPasswordEditing}
						setEditing={setNewPasswordEditing}
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
