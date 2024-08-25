import React, { useState } from 'react'
import OrdersTable from '../OrdersTable/OrdersTable'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { getConsolidatedOrderOrders } from './api/getConsolidatedOrderOrders'
import { deliverConsolidatedOrder } from './api/deliverConsolidatedOrder'
import { deleteConsolidatedOrder } from './api/deleteConsolidatedOrder' // Make sure the path is correct
import Button from '../../UI/Button/Button'
import { toast } from 'react-toastify'
import Checkbox from '../../UI/Checkbox/Checkbox'
import DeleteModal from './components/DeleteModal' // Import the modal component
import cls from './ConsolidatedOrderInfo.module.css'
import 'react-toastify/dist/ReactToastify.css'

const ConsolidatedOrderInfo = () => {
    const { id } = useParams()
    const navigate = useNavigate() // To navigate programmatically
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isChecked, setChecked] = React.useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['consolidated-order-orders', id],
        queryFn: () => getConsolidatedOrderOrders({ id }),
    })

    // UseMutation for delivery
    const { mutate: deliverOrder, isLoading: isDelivering } = useMutation({
        mutationFn: () =>
            deliverConsolidatedOrder({ united_order_id: id, notificate: isChecked }),
        onSuccess: () => {
            toast.success('Заказ доставлен успешно!', {
                autoClose: 1000,
                toastId: id,
            })
        },
        onError: (error) => {
            if (!toast.isActive(id)) {
                toast.error(error?.response?.data?.detail || 'Ошибка доставки заказа', {
                    autoClose: 1000,
                    toastId: id,
                })
            }
        },
    })

    // UseMutation for delete
    const { mutate: deleteOrder, isLoading: isDeleting } = useMutation({
        mutationFn: () => deleteConsolidatedOrder(id),
        onSuccess: () => {
            toast.success('Заказ удалён успешно!', {
                autoClose: 1000,
                toastId: id,
            })
            navigate('/profile/warehouse')
        },
        onError: (error) => {
            toast.error(error?.response?.data?.detail || 'Ошибка удаления заказа', {
                autoClose: 1000,
                toastId: id,
            })
        },
    })

    const convertDate = (date) => {
        return date.split('-').reverse().join('.')
    }

    const handleDeliverOrder = () => {
        deliverOrder()
    }

    const openDeletePopup = () => {
        setDeleteModalOpen(true)
    }

    const closeDeletePopup = () => {
        setDeleteModalOpen(false)
    }

    const handleDeleteOrder = () => {
        deleteOrder()
        closeDeletePopup()
    }

    if (isLoading) {
        return <h1>Загрузка...</h1>
    }

    if (!data) {
        return <h1>Заказ не найден</h1>
    }

    return (
        <>
            <div className={cls.block}>
                <div className={cls.container}>
                    <div className={cls.info}>
                        <div className={cls.status}>
                            <p>Статус:</p>
                            <div
                                className={`${
                                    data.delivered
                                        ? 'banner delivered mx-auto'
                                        : 'banner onTheWay mx-auto'
                                } ${cls.statusBlock}`}
                            >
                                {data?.delivered ? 'Доставлен' : 'В пути'}
                            </div>
                        </div>
                        {data?.delivered && (
                            <>
                                <p>
                                    Дата доставки:{' '}
                                    {data?.delivery_date
                                        ? convertDate(data?.delivery_date)
                                        : 'Неизвестная дата'}
                                </p>
                                <p>
                                    Принял:{' '}
                                    {data?.employee_relationship?.name || 'Неизвестный сотрудник'}
                                </p>
                            </>
                        )}
                    </div>

                    <div className={cls.button}>
                        {!data?.delivered && (
                            <>
                                <div className={cls.checkbox_block}>
                                    <Checkbox checked={isChecked} onChange={setChecked} />
                                    <label
                                        className={cls.checkbox_label}
                                        onClick={() => setChecked((prev) => !prev)}
                                    >
                                        Уведомить клиентов
                                    </label>
                                </div>
                                <Button onClick={handleDeliverOrder} disabled={isDelivering}>
                                    {isDelivering ? 'Загрузка...' : 'Доставить'}
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <OrdersTable
                    orders={data.orders_relationship}
                    delivered={data.delivered}
                />

                <Button red onClick={openDeletePopup}>
                    {isDeleting ? 'Загрузка...' : 'Удалить'}
                </Button>
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeletePopup}
                onConfirm={handleDeleteOrder}
            />
        </>
    )
}

export default ConsolidatedOrderInfo
