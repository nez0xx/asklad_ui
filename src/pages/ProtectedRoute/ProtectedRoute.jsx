import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { matchPath } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
	const { pathname } = useLocation()
	const token = localStorage.getItem('token')
	const user = JSON.parse(localStorage.getItem('user') || '{}')

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

	if ((!token || !user) && !isPublicPath) {
		return <Navigate to='/login' replace />
	}

	if (token && user && (pathname === '/login' || pathname === '/register')) {
		return <Navigate to='/profile/orders' replace />
	}

	return children
}

export default ProtectedRoute
