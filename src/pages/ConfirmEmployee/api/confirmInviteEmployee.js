import InviteService from '../../../services/InviteService'

export async function confirmInviteEmployee(token) {
	const response = await InviteService.confirmInviteEmployee(token)

	return response.data
}
