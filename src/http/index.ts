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


export default $api
