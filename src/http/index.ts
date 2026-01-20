import axios from 'axios'

export const API_URL = 'http://31.128.39.174:9998/'
//export const API_URL = 'http://localhost:9998/'

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

// Добавляем обработку ответов
$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Если оригинальный запрос не содержал конфига - пробрасываем ошибку
        if (!error.config) {
            return Promise.reject(error)
        }

        // Если это ошибка 401 и запрос не помечен как повторный
        if (error.response?.status === 401 && !error.config._retry) {
            error.config._retry = true
            
            try {
                // Пробуем обновить токен
                const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
                    withCredentials: true
                })
                
                if (response.data?.data?.access_token) {
                    // Сохраняем новый токен
                    localStorage.setItem('token', response.data.data.access_token)
                    // Обновляем заголовок в оригинальном запросе
                    error.config.headers.Authorization = `Bearer ${response.data.data.access_token}`
                    // Повторяем оригинальный запрос
                    return $api(error.config)
                }
            } catch (refreshError) {
                // // Если не удалось обновить токен - делаем logout
                localStorage.removeItem('token')
                return Promise.reject(refreshError)
            }
        }
        
        return Promise.reject(error)
    }
)


export default $api
