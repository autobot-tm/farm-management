import { apiCaller } from "../../axios/client";
import { ENDPOINTS } from "./api-endpoints.service";

export const getAllHarvestService = () => {
    return apiCaller.get(ENDPOINTS.harvest.getAll);
};

export const getDetailHarvestService = ({ date }) => {
    return apiCaller.get(ENDPOINTS.harvest.getDetail(date));
};

export const updateHarvestService = ({ id, description, yield_actual, price_actual }) => {
    return apiCaller.put(ENDPOINTS.harvest.edit(id), { description, yield_actual, price_actual });
};

export const createAllHarvestsService = ({ farm_id, description, yield_actual, price_actual }) => {
    return apiCaller.post(ENDPOINTS.harvest.createAll, { farm_id, description, yield_actual, price_actual });
};