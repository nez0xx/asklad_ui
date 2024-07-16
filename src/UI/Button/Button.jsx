import cls from './Button.module.css'

const Button = ({ children, className, ...props }) => {
	return <button className={`${cls.button} ${className}`} {...props}>{children}</button>;
};

export default Button;
