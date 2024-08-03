import React from 'react'
import cls from './DeleteModal.module.css' // Your styles here

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null

	const handleOverlayClick = (event) => {
		event.stopPropagation()
	}

	return (
		<div className={cls.overlay} onClick={onClose}>
			<div className={cls.modal} onClick={handleOverlayClick}>
				<h2>Подтвердить удаление</h2>
				<p>Вы уверены, что хотите удалить этот заказ?</p>
				<div className={cls.buttons}>
					<button className={cls.confirmButton} onClick={onConfirm}>
						Удалить
					</button>
					<button className={cls.cancelButton} onClick={onClose}>
						Отмена
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal
