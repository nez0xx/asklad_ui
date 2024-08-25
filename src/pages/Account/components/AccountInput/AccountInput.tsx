import React from 'react'
import cls from './AccountInput.module.css'

const AccountInput = ({ type, value, setValue, setPasswordClicked }) => {
	const inputRef = React.useRef(null)

	const typeToLabelMap = {
		email: 'Email',
		new_password: 'Новый пароль',
		name: 'Имя',
		password: 'Пароль',
	}

	const changeInputValue = (event) => {
		setValue(event.target.value)
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
					onMouseDown={() => {
						if (type === 'password') {
							setPasswordClicked(true)
							setValue('')
						}
					}}
					onChange={(e) => changeInputValue(e)}
				/>
			</div>
		</div>
	)
}

export default AccountInput
