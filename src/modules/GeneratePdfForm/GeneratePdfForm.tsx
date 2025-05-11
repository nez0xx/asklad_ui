import  React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Button from '@UI/Button/Button'
import { useMutation } from 'react-query'
import { parsePdf } from './api/parsePdf'
import { toast } from 'react-toastify'
import { saveAs } from 'file-saver'
import cls from './GeneratePdfForm.module.css'

const toastId = 'parse-pdf-toast'

const generateNewName = (filename) => filename.split('.')[0] + '_new'


const GeneratePdfForm = () => {
	const [filename, setFilename] = useState('')
	const [isUploading, setIsUploading] = useState(false)

	const { mutate } = useMutation(parsePdf, {
		onMutate: () => {
			setIsUploading(true)
			toast.loading('Обработка PDF...', {
				toastId,
			})
		},
		onSuccess: (data) => {
			setIsUploading(false)
			const blob = new Blob([data], { type: 'application/pdf' })
			const safeFilename = filename ? generateNewName(filename) : 'generated_file.pdf'
			saveAs(blob, safeFilename)

			toast.update(toastId, {
				render: 'PDF успешно сгенерирован',
				type: 'success',
				isLoading: false,
				autoClose: 1000,
			})
		},
		onError: (error) => {
			setIsUploading(false)
			toast.update(toastId, {
				render: error?.response?.data?.detail || 'Неизвестная ошибка',
				type: 'error',
				isLoading: false,
				autoClose: 1000,
			})
		},
	})

	function handleAddNewOrder(e) {
		e.preventDefault()
		const formData: any = new FormData(e.target)
		mutate(formData)
	}

	function handleAddFile(e) {
		setFilename(e.target.files[0].name)
	}

	return (
		<form className={cls.form} onSubmit={handleAddNewOrder}>
			<div className={cls.field}>
				<label className={cls.label}>Загрузите PDF-файл с накладными:</label>
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
		</form>
	)
}

export default GeneratePdfForm
