import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from '@UI/Button/Button'
import {useMutation} from 'react-query'
import {toast, ToastContainer} from 'react-toastify'
import {generateExcel} from '../api/generateExcel'
import Checkbox from '@UI/Checkbox/Checkbox'
import {saveAs} from 'file-saver'
import cls from './ConsolidatedOrdersTable.module.css'

const containerId = 'consolidated-orders-table-toast-container'
const toastId = 'consolidated-orders-table-toast'

const ConsolidatedOrdersTable = ({data}) => {
    const navigate = useNavigate()
    const [chosenList, setChosenList] = useState([])

    console.log(data,'DATA TABLE')
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

    const handleCheckboxChange = (id, checked) => {
        if (checked) {
            setChosenList((prevList) => [...prevList, id])
        } else {
            setChosenList((prevList) => prevList.filter((itemId) => itemId !== id))
        }
    }

    const sortedOrders = data ?? [].sort((a, b) => {
        const dateA = a.delivery_date ? new Date(a.delivery_date) : new Date(0)
        const dateB = b.delivery_date ? new Date(b.delivery_date) : new Date(0)
        return dateB - dateA
    })
    // console.log(consolidatedOrders, 'PRR')
    return (
        <div className={cls.container}>
            <table className={cls.table}>
                <thead>
                <tr>
                    <th></th>
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
                {sortedOrders?.map((order, index) => (
                    <tr key={order.id} id='consolidated-table-row'>
                        <td
                            className={cls.td}
                            onClick={() => navigateToDetails(order.id)}
                        >
                            {index + 1}
                        </td>
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
            <ToastContainer containerId={containerId}/>
        </div>
    )
}

export default ConsolidatedOrdersTable
