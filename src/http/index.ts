import axios from 'axios'
import { getRefreshToken } from '@utils/getRefreshToken'

export const API_URL = 'https://api.asklad.pro/'

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

$api.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('token')

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

$api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				const newAccessToken = await getRefreshToken()
				localStorage.setItem('token', newAccessToken)

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
				return $api(originalRequest)
			} catch (refreshError) {
				console.error('Token refresh failed', refreshError)
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)

export default $api
