import React, { forwardRef } from 'react';

import cls from './Modal.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';

const Modal = ({ children, onClose = function () {} }, ref) => {
	function handleCloseModal() {
		onClose();
		ref.current.close();
	}

	return (
		<dialog ref={ref} className={cls.modal}>
			<button className={cls.closeBtn} onClick={handleCloseModal}>
				<Icon icon='jam:close' width='25px' height='25px' />
			</button>
			{children}
		</dialog>
	);
};

export default forwardRef(Modal);
