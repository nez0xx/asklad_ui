import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from '@UI/Button/Button'
import {useMutation, useQuery} from 'react-query'
import {toast, ToastContainer} from 'react-toastify'
import {generateExcel} from '../api/generateExcel'
import Checkbox from '@UI/Checkbox/Checkbox'
import {saveAs} from 'file-saver'
import cls from './ConsolidatedOrdersTable.module.css'
import Pagination from '@/UI/Pagination/Pagination'
import useConsilatedOrdersStore from '@/store/consolidatedOrdersStore'
import { sortDataByDate } from '@/utils/sortDatabyDate'
import { getUnitedOrdersPage } from '@/modules/WareHouseContent/api/getOrdersPage'

const containerId = 'consolidated-orders-table-toast-container'
const toastId = 'consolidated-orders-table-toast'

const ConsolidatedOrdersTable = () => {
    const navigate = useNavigate()
    const [chosenList, setChosenList] = useState([])
    const {mutate, isLoading} = useMutation(generateExcel, {
        onSuccess: (data) => {
            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
            saveAs(blob, 'Лист выдачи.xlsx')
            setChosenList([])
            toast.success('Excel успешно сгенерирован', {
                containerId,
                autoClose: 1000,
            })
        },
        onError: (error) => {
            toast.error(error?.response?.data?.detail || 'Неизвестная ошибка', {
                autoClose: 1000,
                toastId,
            })
        },
    })
    const setData = useConsilatedOrdersStore(state => state.setData)
    const page = useConsilatedOrdersStore(state => state.data)
    const currentPage = useConsilatedOrdersStore(state => state.currentPage)
    const nextPage = useConsilatedOrdersStore(state => state.nextPage)
    const previousPage = useConsilatedOrdersStore(state => state.previousPage)
    const setPage = useConsilatedOrdersStore(state => state.setPage)
    const totalPages = useConsilatedOrdersStore(state => state.totalPages)
    const size = useConsilatedOrdersStore(state => state.size)

    let { data } = useQuery({
        queryKey: ['consolidated-order-all', currentPage],
        queryFn: () => getUnitedOrdersPage(currentPage, size),
        refetchOnWindowFocus: false,
        retry: false,
    })


    function navigateToDetails(id) {
        navigate(`/profile/order/${id}`)
    }

    useEffect(() => {
        const rows = document.querySelectorAll(`#consolidated-table-row`)
        rows.forEach((row) => {
            const tds = row.querySelectorAll(`.${cls.td}`)
            tds.forEach((td, index) => {
                if (index < tds.length) {
                    td.addEventListener('mouseenter', () => {
                        tds.forEach((innerTd, innerIndex) => {
                            if (innerIndex < tds.length) {
                                innerTd.classList.add(cls.tdHoverEffect)
                            }
                        })
                    })
                    td.addEventListener('mouseleave', () => {
                        tds.forEach((innerTd, innerIndex) => {
                            if (innerIndex < tds.length) {
                                innerTd.classList.remove(cls.tdHoverEffect)
                            }
                        })
                    })
                }
            })
        })
    }, [])

    useEffect(() => {
        if(data) {
            const sortedData = sortDataByDate(data.united_orders)
            setData(sortedData, data.count)
        }
    }, [data])

    const handleCheckboxChange = (id, checked) => {
        if (checked) {
            setChosenList((prevList) => [...prevList, id])
        } else {
            setChosenList((prevList) => prevList.filter((itemId) => itemId !== id))
        }
    }
    

    return (
        <div className={cls.container}>
            <div>
                <table className={cls.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Статус</th>
                        <th>Дата доставки</th>
                        <th>Принял</th>
                        <th className={cls.lastTh}>
                            <Button
                                styles={{fontSize: '17px'}}
                                onClick={() => mutate(chosenList)}
                                disabled={isLoading}
                            >
                                Лист выдачи
                            </Button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {page.map((order, index) => (
                        <tr key={order.id} id='consolidated-table-row'>
                            <td
                                className={cls.td}
                                onClick={() => navigateToDetails(order.id)}
                            >
                                {order.id}
                            </td>
                            <td
                                className={cls.td}
                                onClick={() => navigateToDetails(order.id)}
                            >
                                <div
                                    className={`${
                                        order.delivered
                                            ? 'banner delivered mx-auto'
                                            : 'banner onTheWay mx-auto'
                                    } ${cls.td}`}
                                >
                                    {order.delivered ? 'Доставлен' : 'В пути'}
                                </div>
                            </td>
                            <td
                                className={cls.td}
                                onClick={() => navigateToDetails(order.id)}
                            >
                                {order.delivery_date
                                    ? order.delivery_date.split('-').reverse().join('.')
                                    : ''}
                            </td>
                            <td className={cls.td}>{order?.employee_relationship?.name ?? null}</td>
                            <td className={cls.tickTd}>
                                <Checkbox
                                    checked={chosenList.includes(order.id)}
                                    onChange={(checked) =>
                                        handleCheckboxChange(order.id, checked)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {page.length ? <Pagination setPage={setPage} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} totalPages={totalPages}/> : ''}
            </div>
            <ToastContainer containerId={containerId}/>
        </div>
    )
}

export default ConsolidatedOrdersTable
