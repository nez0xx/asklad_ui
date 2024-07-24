import React from 'react'
import { FinanceTable } from '../../modules/FinanceTable/FinanceTable'
import { Icon } from '@iconify/react/dist/iconify.js'
import cls from './Finance.module.css'

export const Finance = () => {
	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Оборот</h1>

			<div>
				<div className={cls.totalTurnover}>Общий: 1 129 999 руб.</div>
				<div className={cls.dates}>
					<div className={cls.date}>01.01.2024</div>
					<div className={cls.icon}>
						<Icon
							icon='mdi:arrow-right'
							width='20px'
							height='20px'
							color='#1f1f1f'
						/>
					</div>
					<div className={`${cls.date} ${cls.active}`}>01.01.2024</div>
				</div>
			</div>

			<FinanceTable />
		</section>
	)
}
