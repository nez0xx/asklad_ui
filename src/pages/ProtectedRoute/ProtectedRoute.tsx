import React, { useEffect } from 'react'
import { useLocation, useNavigate, matchPath } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
	const { pathname } = useLocation()
	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	// Define public paths that don't require authentication
	const publicPaths = [
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

	useEffect(() => {
		if (!token && !isPublicPath && pathname !== '/register') {
			navigate('/login', { replace: true })
		} else if (token && (pathname === '/login' || pathname === '/register')) {
			navigate('/profile/orders', { replace: true })
		}
	}, [token, isPublicPath, pathname, navigate])

	return children
}

export default ProtectedRoute
