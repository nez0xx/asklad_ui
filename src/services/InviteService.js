import $api from '../http'

export default class InviteService {
	static async confirmInviteEmployee(token) {
		return $api.post(`/invite/${token}`)
	}
}
