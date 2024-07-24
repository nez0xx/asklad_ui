import React from 'react'
import Button from '../../../../UI/Button/Button'
import cls from './AccountInput.module.css'

const AccountInput = ({ type, value }) => {
	const [isEditing, setEditing] = React.useState(false)
	const [inputValue, setInputValue] = React.useState(value)
	const inputRef = React.useRef(null)

	const typeToLabelMap = {
		email: 'Email',
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
		setInputValue(event.target.value)
	}

	const startInputChange = () => {
		focusInput()
		setEditing(true)
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
					type={type}
					className={cls.input}
					value={inputValue}
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
