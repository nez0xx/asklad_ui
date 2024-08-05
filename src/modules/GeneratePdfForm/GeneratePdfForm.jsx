import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Button from '../../UI/Button/Button'
import { useMutation } from 'react-query'
import { parsePdf } from './api/parsePdf'
import { toast, ToastContainer } from 'react-toastify'
import { saveAs } from 'file-saver'
import cls from './GeneratePdfForm.module.css'

const containerId = 'parse-pdf-toast-container'
const toastId = 'parse-pdf-toast'

const GeneratePdfForm = () => {
	const [filename, setFilename] = useState('')

	const { mutate, isLoading } = useMutation(parsePdf, {
		onSuccess: (data) => {
			console.log(data)
			const blob = new Blob([data], { type: 'application/pdf' })
			saveAs(blob, `${filename}_new.pdf`)
			toast.success('PDF успешно сгенерирован', {
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

	function handleAddNewOrder(e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		mutate(formData)
	}

	function handleAddFile(e) {
		setFilename(e.target.files[0].name)
	}

	return (
		<form className={cls.form} onSubmit={handleAddNewOrder}>
			<div className={cls.field}>
				<label className={cls.label}>Загрузите PDF-файл:</label>
				<label htmlFor='pdf_file' className={cls.fileUploadCont}>
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
						id='pdf_file'
						accept='.pdf'
						name='file'
						onChange={handleAddFile}
					/>
				</label>
			</div>

			<Button>Получить PDF</Button>
			<ToastContainer containerId={containerId} />
		</form>
	)
}

export default GeneratePdfForm
