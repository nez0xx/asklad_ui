import React, { useState } from 'react'
import ConsolidatedOrdersTable from './components/ConsolidatedOrdersTable'
import { Icon } from '@iconify/react/dist/iconify.js'
import cls from './ConsolidatedOrders.module.css'

const ConsolidatedOrders = ({ data }) => {
	const [isExpanded, setIsExpanded] = useState(true)
	const handleToggle = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className={cls.ConsolidatedOrders}>
			<div className={`${cls.tableCont} ${isExpanded ? cls.show : cls.hide}`}>
				<ConsolidatedOrdersTable data={data} />
			</div>
		</div>
	)
}

export default ConsolidatedOrders
