import React, { useRef } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import cls from './OrdersSearch.module.css'
import { Select } from '../../../../UI/Select/Select'

const OrdersSearch = ({
	value,
	setValue,
	selectedValue,
	setSelectedValue,
	handleSelectChange,
	options,
}) => {
	const inputRef = useRef(null)

	const handleIconClick = () => {
		inputRef.current.focus()
	}

	return (
		<div className={cls.searchBlock}>
			<div className={cls.input}>
				<input
					ref={inputRef}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder='Поиск по ID'
					type='text'
				/>
				<div onClick={handleIconClick}>
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
