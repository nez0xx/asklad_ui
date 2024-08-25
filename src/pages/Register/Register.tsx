import RegisterForm from '@modules/Register/components/RegisterForm/RegisterForm'
import cls from './Register.module.css'
import Header from '@modules/Header/Header'

const Register = () => {
	return (
		<div>
			<Header />

			<div className={cls.registerFormCont}>
				<RegisterForm />
			</div>
		</div>
	)
}

export default Register
