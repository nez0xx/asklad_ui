import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../../UI/Button/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import cls from './SuccessfulRegistration.module.css'
import Header from '../../modules/Header/Header'

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
					<p>
						На Ваш электронный ящик отправлено письмо со ссылкой для
						подтверждения регистрации. Подтвердите регистрацию и авторизуйтесь
						на сайте. Если Вы не видите письма, проверьте папку со спамом.
					</p>
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
							<div className={cls.homepage_link}>
								<Button
									className={cls.button}
									onClick={() => navigate('/profile/orders')}
								>
									На главную
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
