import { apiCaller } from "../../axios/client";
import { ENDPOINTS } from "./api-endpoints.service";

export const getAllHarvestService = () => {
    return apiCaller.get(ENDPOINTS.harvest.getAll);
};