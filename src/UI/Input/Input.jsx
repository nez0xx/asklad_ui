import cls from './Input.module.css';

const Input = ({ id, label, ...props }) => {
	return (
		<div className={cls.inputCont}>
			<label htmlFor={id}>{label}</label>
			<input type='text' id={id} {...props} />
		</div>
	);
};

export default Input;
