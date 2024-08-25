import { apiCaller } from "../../axios/client";
import { ENDPOINTS } from "./api-endpoints.service";

export const getAllFarmService = () => {
    return apiCaller.get(ENDPOINTS.farm.getAll);
};