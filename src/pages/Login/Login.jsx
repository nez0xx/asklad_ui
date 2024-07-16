import LoginForm from '../../modules/Login/components/LoginForm/LoginForm';
import cls from './Login.module.css';

const Login = () => {
	return (
		<div className='wrapper'>
			<div className={cls.loginFormCont}>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
