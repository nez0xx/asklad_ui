// src/pages/ProtectedRoute/ProtectedRoute.js
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
	const { pathname } = useLocation()
	const token = localStorage.getItem('token')
	const user = localStorage.getItem('user')

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

	if ((!token || !user) && !publicPaths.includes(pathname)) {
		return <Navigate to='/login' replace />
	}

	if (token && user && (pathname === '/login' || pathname === '/register')) {
		return <Navigate to='/profile/orders' replace />
	}

	return children
}

export default ProtectedRoute
