import cls from './Button.module.css'

const Button = ({ children, className, styles, ...props }) => {
	return (
		<button style={styles} className={`${cls.button} ${className}`} {...props}>
			{children}
		</button>
	)
}

export default Button
