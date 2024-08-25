import { useState } from 'react'
import ConsolidatedOrdersTable from './components/ConsolidatedOrdersTable'
import { Icon } from '@iconify/react/dist/iconify'
import cls from './ConsolidatedOrders.module.css'

const ConsolidatedOrders = ({ data }) => {
	const [isExpanded, setIsExpanded] = useState(true)

	const handleToggle = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className={cls.ConsolidatedOrders}>
			<h2
				className={`${cls.secondaryTitle} ${
					isExpanded ? cls.expandedTitle : ''
				}`}
				onClick={handleToggle}
			>
				<div>Консолидированные заказы</div>
				<div
					className={`${cls.titleIcon} ${!isExpanded ? cls.expandedIcon : ''}`}
				>
					<Icon
						icon='mdi:chevron-down'
						width='25px'
						height='25px'
						color='#1f1f1f'
					/>
				</div>
			</h2>

			<div className={`${cls.tableCont} ${isExpanded ? cls.show : cls.hide}`}>
				<ConsolidatedOrdersTable consolidatedOrders={data} />
			</div>
		</div>
	)
}

export default ConsolidatedOrders
