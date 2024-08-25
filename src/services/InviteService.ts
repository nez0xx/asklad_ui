import $api from '@http/../http'

export default class InviteService {
	static async confirmInviteEmployee(token) {
		return $api.get(`/invite/${token}`)
	}
}
