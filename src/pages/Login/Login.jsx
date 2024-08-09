import LoginForm from '../../modules/Login/components/LoginForm/LoginForm'
import Header from '../../modules/Header/Header'
import cls from './Login.module.css'

const Login = () => {
	return (
		<div>
			<Header />

			<div className={cls.loginFormCont}>
				<LoginForm />
			</div>
		</div>
	)
}

export default Login
