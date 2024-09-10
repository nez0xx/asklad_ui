import {Icon} from '@iconify/react/dist/iconify.js'
import {useState} from 'react'
import {useMutation} from 'react-query'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Button from '@UI/Button/Button'
import Input from '@UI/Input/Input'
import {login} from '../../api/login'
import cls from './LoginForm.module.css'
import {useAuth} from "@context/userContext";

const LoginForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/profile/orders'
	const { loginUser } = useAuth()

	const { mutate } = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			setEmail('')
			setPassword('')
			loginUser()
			navigate(from, { replace: true })
			window.location.reload()

		},
		onError: (error) => {
			toast.error(error?.response?.data?.detail || 'Ошибка входа', {
				autoClose: 1000,
			})
		},
	})
	function handleLogin(e) {
		e.preventDefault()

		if (!email || !password) {
			toast.error('Введите логин и пароль', {
				autoClose: 1000,
			})
			return
		}

		mutate({ email, password })
	}

	return (
		<form className={cls.form} onSubmit={handleLogin}>
			<div className={cls.title}>
				<div>
					<Link to='/register'>
						<Icon
							icon='mdi:chevron-left'
							width='25px'
							height='25px'
							color='#000464'
						/>
					</Link>
					<h2>Вход в аккаунт</h2>
				</div>
			</div>

			<div className={cls.inputs}>
				<Input
					id='email'
					label='Введите email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					id='password'
					type='password'
					label='Пароль'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button>Войти</Button>
			</div>

			<div className={cls.resetLinkBlock}>
				<div>
					<div>Забыли пароль? </div>
					<Link to='/enter_email'>Восстановить пароль</Link>
				</div>
			</div>
		</form>
	)
}

export default LoginForm
