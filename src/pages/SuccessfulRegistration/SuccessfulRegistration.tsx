import { useNavigate, Link } from 'react-router-dom'
import Button from '@UI/Button/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import cls from './SuccessfulRegistration.module.css'
import Header from '@modules/Header/Header'

const SuccessfulRegistration = () => {
	const navigate = useNavigate()
	return (
		<div>
			<Header />

			<section className={cls.section}>
				<div>
					<div className={cls.success}>
						<Icon icon='mdi:check' width='55px' height='55px' color='#000464' />
					</div>
					<h1 className={cls.title}>Успешная регистрация</h1>
					<div className={cls.navigation}>
						<div className={cls.navigationCont}>
							<Link className={cls.register_link} to='/register'>
								<Icon
									icon='mdi:chevron-left'
									width='25px'
									height='25px'
									color='#000464'
								/>
								<div>Страница авторизации</div>
							</Link>
							<div>
								<Button
									className={cls.button}
									onClick={() => navigate('/login')}
								>
									Войти
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default SuccessfulRegistration
