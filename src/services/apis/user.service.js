import { apiCaller } from '../../axios/client'
import { ENDPOINTS } from './api-endpoints.service'

/**
 * Sign in service.
 * @param {Object} input - The input object.
 * @param {string} input. - The email.
 * @param {string} input. - The password.
 * @returns {Promise} - The promise of the API call.
 */
export const updateProfileService = ({ }) => {
    return apiCaller.post(ENDPOINTS.user.update, {})
}