import  { createContext, useState, useEffect, useContext } from 'react'
import { getMe } from './api/getMe.js'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [isAuth, setIsAuth] = useState(false)

	const fetchUser = async () => {
		const token = localStorage.getItem('token')
		if (token) {
				const userData = await getMe()
				setUser(userData)
				setIsAuth(true)
		} else {
			setIsAuth(false)
			logout()
		}
		setLoading(false)
	}

	const loginUser = async () => {
		setLoading(true)
		try {
			await fetchUser()
		} catch (error) {
			console.error('Error during login process', error)
		} finally {
			setLoading(false)
		}
	}

	const logout = () => {
		localStorage.removeItem('token')
		setUser(null)
		setIsAuth(false)
	}

	useEffect(() => {
		fetchUser()
	}, [])

	return (
		<AuthContext.Provider
			value={{ user, isAuth, setUser, loginUser, logout, loading }}
		>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
