import $api from "@/http";

export const getRefreshToken = async () => {
    try {
        const response = await $api.get('/auth/refresh', {
            withCredentials: true,
        })

        const newAccessToken = response.data.access_token

        localStorage.setItem('token', newAccessToken)

        return newAccessToken
    } catch (error) {
        console.error('Error refreshing token:', error)
        throw error
    }
}
