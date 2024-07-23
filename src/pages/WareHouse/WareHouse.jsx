import React from 'react'
import cls from './WareHouse.module.css'
import WareHouseContent from '../../modules/WareHouseContent/WareHouseContent'

const WareHouse = () => {
	return (
		<section className={cls.section}>
			<WareHouseContent />
		</section>
	)
}

export default WareHouse
