import {useRef, useState} from 'react'
import {Icon} from '@iconify/react/dist/iconify.js'
import Button from '@UI/Button/Button'
import {useMutation} from 'react-query'
import {uploadOrder} from './api/uploadOrder.ts'
import {toast, ToastContainer} from 'react-toastify'
import cls from './AddOrderForm.module.css'
import {UserModal} from "@/components/user-modal/UserModal";

const containerId = 'add-order-toast-container'
const toastId = 'add-order-toast'
const AddOrderForm = () => {
    const [filename, setFilename] = useState('')
    const buttonRef = useRef(null);
    const {mutate, isLoading, data} = useMutation({
        mutationFn: uploadOrder,
        onError: (error) => {
            toast.update(toastId, {
                containerId,
                autoClose: 1000,
                render: error.response.data.detail,
                type: 'error',
                isLoading: false,
            })
        },
        onSuccess: () => {
            toast.update(toastId, {
                containerId,
                autoClose: 1000,
                render: 'Order added successfully',
                type: 'success',
                isLoading: false,
            })
        },
    })

    if (isLoading) {
        toast('Uploading...', {
            toastId,
            containerId,
            isLoading: true,
        })
    }

    function handleAddNewOrder(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        mutate(formData)
    }

    function handleAddFile(e) {
        setFilename(e.target.files[0].name)
    }

    return (
        <>
            <form className={cls.form} onSubmit={handleAddNewOrder}>
                {/* <div>
				<label className={cls.label} htmlFor=''>
					Выберите образовательный центр:
				</label>
				<select className={cls.dropdown}>
					<option value='first'>First</option>
					<option value='second'>Second</option>
					<option value='third'>Third</option>
				</select>
			</div> */}
                <div className={cls.field}>
                    <label className={cls.label}>Загрузите Excel-файл "Консолидированные товары"</label>
                    <label htmlFor='file' className={cls.fileUploadCont}>
                        <div className={cls.uploadCont}>
                            <Icon
                                icon='ooui:upload'
                                width='35px'
                                height='35px'
                                color='#0232ae'
                            />
                            {filename ? filename : 'Перетащите или загрузите с компьютера'}
                        </div>
                        <input
                            className={cls.fileUpload}
                            type='file'
                            id='file'
                            accept='.xlsx'
                            name='file'
                            onChange={handleAddFile}
                        />
                    </label>
                </div>

                <Button>Добавить заказ</Button>
                <ToastContainer containerId={containerId}/>
            </form>
            <>
                {data?.data && <UserModal data={data.data}/>}
            </>
        </>
    )
}

export default AddOrderForm
