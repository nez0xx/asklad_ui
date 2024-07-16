import React from 'react';
import ProfileSideMenu from './components/ProfileSideMenu/ProfileSideMenu';
import { Outlet } from 'react-router-dom';

import cls from './Profile.module.css';
import { checkAuth } from './api/checkAuth';
import { useQuery } from 'react-query';
import { Icon } from '@iconify/react/dist/iconify.js';

const Profile = () => {
	const {} = useQuery({
		queryKey: ['check-auth'],
		queryFn: checkAuth,
		onSuccess: (data) => {
			console.log(data);
		},
	});

	return (
		<>
			<header className={cls.header}>
				<div></div>
				<div className='wrapper'>
					<div className={cls.headerCont}>
						<a href='https://t.me/askladsupbot'>
							<Icon
								icon='hugeicons:customer-support'
								width='25px'
								height='25px'
							/>
							Поддержка
						</a>
					</div>
				</div>
			</header>
			<main className={cls.profile}>
				<ProfileSideMenu />
				<Outlet />
			</main>
		</>
	);
};

export default Profile;
