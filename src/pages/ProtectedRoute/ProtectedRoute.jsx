import React from 'react'
import { useLocation, useNavigate, matchPath } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getMe } from './api/getMe'

const ProtectedRoute = ({ children }) => {
	const { pathname } = useLocation()
	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	const publicPaths = [
		'/login',
		'/register',
		'/enter_email',
		'/reset_password/:token',
		'/email_sent',
		'/confirm_email_sent',
		'/successful_registration',
		'/confirm_email/:token',
		'/confirm_employee/:token',
	]

	const isPublicPath = publicPaths.some((publicPath) =>
		matchPath({ path: publicPath, end: false }, pathname)
	)

	if (!token && !isPublicPath) {
		navigate('/login')
	}

	const { data: user, error } = useQuery(['getMe', token], () => getMe(), {
		enabled: !!token,
		retry: false,
		onError: () => {
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			navigate('/login')
		},
	})

	if (error || !user) {
		navigate('/login')
	}

	if (user && (pathname === '/login' || pathname === '/register')) {
		navigate('/profile/orders')
	}

	return children
}

export default ProtectedRoute
