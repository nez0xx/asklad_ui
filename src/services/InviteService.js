import $api from '../http'

export default class InviteService {
	static async confirmInviteEmployee(token) {
		return $api.get(`/invite/${token}`)
	}
}
