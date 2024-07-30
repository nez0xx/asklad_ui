import React, { useRef } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import cls from './OrdersSearch.module.css'
import { Select } from '../../../../UI/Select/Select'

const OrdersSearch = ({
	searchNumberValue,
	setSearchNumberValue,
	searchNameValue,
	setSearchNameValue,
	selectedValue,
	setSelectedValue,
	handleSelectChange,
	options,
}) => {
	const numberInputRef = useRef(null)
	const nameInputRef = useRef(null)

	const handleNumberIconClick = () => {
		numberInputRef.current.focus()
	}
	const handleNameIconClick = () => {
		nameInputRef.current.focus()
	}

	return (
		<div className={cls.searchBlock}>
			<div className={cls.input}>
				<input
					ref={numberInputRef}
					value={searchNumberValue}
					onChange={(e) => setSearchNumberValue(e.target.value)}
					placeholder='Поиск по номеру заказа'
					type='text'
				/>
				<div onClick={handleNumberIconClick}>
					<Icon
						icon='material-symbols:search'
						width='22px'
						height='22px'
						color='white'
					/>
				</div>
			</div>

			<div className={cls.input}>
				<input
					ref={nameInputRef}
					value={searchNameValue}
					onChange={(e) => setSearchNameValue(e.target.value)}
					placeholder='Поиск по имени'
					type='text'
				/>
				<div onClick={handleNameIconClick}>
					<Icon
						icon='material-symbols:search'
						width='22px'
						height='22px'
						color='white'
					/>
				</div>
			</div>

			<Select
				options={options}
				selectedValue={selectedValue}
				onChange={setSelectedValue}
				handleSelectChange={handleSelectChange}
			/>
		</div>
	)
}

export default OrdersSearch
