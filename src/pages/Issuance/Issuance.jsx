import React from 'react'
import { IssuanceTable } from '../../modules/IssuanceTable/IssuanceTable'
import Button from '../../UI/Button/Button'
import cls from './Issuance.module.css'

export const Issuance = () => {
	return (
		<section className={cls.section}>
			<h1 className={cls.title}>Выдача</h1>

			<IssuanceTable />

			<Button>Сгенерировать </Button>
		</section>
	)
}
