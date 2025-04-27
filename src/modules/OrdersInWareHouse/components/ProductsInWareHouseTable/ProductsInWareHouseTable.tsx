import React, { useEffect } from 'react'
import cls from './OrdersInWareHouseTable.module.css'
import useProductsInWareHouse from '@/store/productsInWareHouseStore'
import { useQuery } from 'react-query'
import { getWarehousePage } from '@/modules/WareHouseContent/api/getWarehousePage'
import { sortDataByDate } from '@/utils/sortDatabyDate'
import Pagination from '@/UI/Pagination/Pagination'

const ProductsInWareHouseTable = () => {
		const size = useProductsInWareHouse(state => state.size)
		const setData = useProductsInWareHouse(state => state.setData)
		const tableSize = useProductsInWareHouse(state => state.size)
		const page = useProductsInWareHouse(state => state.data)
		const currentPage = useProductsInWareHouse(state => state.currentPage)
		const nextPage = useProductsInWareHouse(state => state.nextPage)
		const previousPage = useProductsInWareHouse(state => state.previousPage)
		const setPage = useProductsInWareHouse(state => state.setPage)
		const totalPages = useProductsInWareHouse(state => state.totalPages)
	
		let { data } = useQuery({
			queryKey: ['products-all', currentPage],
			queryFn: () => getWarehousePage(currentPage, size),
			refetchOnWindowFocus: false,
			retry: false,
		})
		useEffect(() => {
					if(data) {
						const sortedData = sortDataByDate(data)
						setData(sortedData as [], data.count)
					}
		}, [data])
	return (
		<div>
			{page.length > 0 ? (
				<>
				<table className={cls.table}>
					<thead>
						<tr>
							<th></th>
							<th>Товар</th>
							<th>Количество</th>
						</tr>
					</thead>
					<tbody>
						{page.map((product, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{product.title}</td>
								<td>{product.amount}</td>
							</tr>
						))}
					</tbody>
				</table>
				{page.length ? <Pagination setPage={setPage} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} totalPages={totalPages}/> : ''}
				</>
			) : (
				<p>Продуктов нет</p>
			)}
		</div>
	)
}

export default ProductsInWareHouseTable
