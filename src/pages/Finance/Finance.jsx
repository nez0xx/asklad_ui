import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getFinReport } from './api/getFinReport'
import { FinanceTable } from '../../modules/FinanceTable/FinanceTable'
import { Icon } from '@iconify/react/dist/iconify.js'
import cls from './Finance.module.css'

const Finance = () => {
	const [startDate, setStartDate] = useState('2024-01-01')
	const [endDate, setEndDate] = useState('2024-01-01')

	const { data, isLoading, isError, error } = useQuery(
		['fin_report', startDate, endDate],
		() => getFinReport(startDate, endDate),
		{
			enabled: !!startDate && !!endDate,
		},
		{
			keepPreviousData: true,
		}
	)

	const handleStartDateChange = (e) => {
		setStartDate(e.target.value)
	}

	const handleEndDateChange = (e) => {
		setEndDate(e.target.value)
	}

	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Оборот</h1>

			<div>
				<div className={cls.totalTurnover}>
					Общий: {isLoading ? 'Loading' : data.total_price.rub} руб.
				</div>
				<div className={cls.totalTurnover}>
					Оборот PV: {isLoading ? 'Loading' : data.total_pv} руб.
				</div>

				<div className={cls.dates}>
					<input
						type='date'
						className={`${cls.date} ${cls.input}`}
						value={startDate}
						onChange={handleStartDateChange}
					/>
					<div className={cls.icon}>
						<Icon
							icon='mdi:arrow-right'
							width='20px'
							height='20px'
							color='#1f1f1f'
						/>
					</div>
					<input
						type='date'
						className={`${cls.date} ${cls.input} ${cls.active}`}
						value={endDate}
						onChange={handleEndDateChange}
					/>
				</div>
			</div>

			{isLoading ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error: {error.message}</div>
			) : (
				data &&
				Object.keys(data.orders).length > 0 && (
					<FinanceTable orders={Object.entries(data.orders)} />
				)
			)}
		</section>
	)
}

export default Finance
