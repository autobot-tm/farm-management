import { apiCaller } from "../../axios/client";
import { ENDPOINTS } from "./api-endpoints.service";

/**
 * Sign in service.
 * @param {Object} input - The input object.
 * @param {string} input. - The email.
 * @param {string} input. - The password.
 * @returns {Promise} - The promise of the API call.
 */
export const getPlantsService = () => {
  return apiCaller.get(ENDPOINTS.plants.getAll);
};

export const fetchFilteredData = ({}, {}) => {
  return apiCaller.get(ENDPOINTS.plants.getByFilter, {}, {});
};
