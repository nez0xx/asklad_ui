import cls from './Button.module.css'

const Button = ({ children, red, className, styles, ...props }) => {
	return (
		<button
			style={styles}
			className={`${cls.button} ${red ? cls.red : ''} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
