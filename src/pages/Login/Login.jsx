import LoginForm from '../../modules/Login/components/LoginForm/LoginForm'
import { Header } from '../../UI/Header/Header'
import cls from './Login.module.css'

const Login = () => {
	return (
		<div className='wrapper'>
			<Header />

			<div className={cls.loginFormCont}>
				<LoginForm />
			</div>
		</div>
	)
}

export default Login
