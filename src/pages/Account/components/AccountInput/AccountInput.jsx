import React from 'react'
import Button from '../../../../UI/Button/Button'
import cls from './AccountInput.module.css'

const AccountInput = ({
	type,
	value,
	setValue,
	setEnterNewPassword,
	isEditing,
	setEditing,
	setNewPasswordEditing,
	setResetPressed,
}) => {
	const inputRef = React.useRef(null)

	const typeToLabelMap = {
		new_password: 'Новый пароль',
		name: 'Имя',
		password: 'Пароль',
	}

	const focusInput = () => {
		inputRef.current.focus()
	}
	const blurInput = () => {
		inputRef.current.blur()
	}

	const changeInputValue = (event) => {
		setValue(event.target.value)
	}

	const startInputChange = () => {
		focusInput()
		setEditing(true)
		if (type === 'password') {
			console.log('here')
			setValue('')
			setEnterNewPassword(true)
			setResetPressed(true)
		}
	}

	const confirmInputChange = () => {
		blurInput()
		setEditing(false)
	}

	return (
		<div>
			<div className={cls.label}>{typeToLabelMap[type]}</div>
			<div className={cls.inputCont}>
				<input
					ref={inputRef}
					type={type === 'new_password' ? 'password' : type}
					className={cls.input}
					value={value}
					placeholder=' '
					onMouseDown={(e) => e.preventDefault()}
					onChange={(e) => changeInputValue(e)}
				/>
				{isEditing ? (
					<Button onClick={confirmInputChange} className={cls.button}>
						Подтвердить
					</Button>
				) : (
					<Button onClick={startInputChange} className={cls.button}>
						{type !== 'password' ? 'Изменить' : 'Сбросить'}
					</Button>
				)}
			</div>
		</div>
	)
}

export default AccountInput
