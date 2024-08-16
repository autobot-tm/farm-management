import { apiCaller } from "../../axios/client";
import { ENDPOINTS } from "./api-endpoints.service";

/**
 * Sign in service.
 * @param {Object} dataUser - The input object.
//  * @param {string} input.email - The email.
//  * @param {string} input.password - The password.
 * @returns {Promise} - The promise of the API call.
 */
export const signInService = ({ dataUser }) => {
  return apiCaller.post(ENDPOINTS.auth.login, { dataUser });
};
