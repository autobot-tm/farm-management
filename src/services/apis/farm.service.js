import { apiCaller } from "../../axios/client";
import { ENDPOINTS } from "./api-endpoints.service";

export const getAllFarmService = () => {
    return apiCaller.get(ENDPOINTS.farm.getAll);
};

export const getFarmByIdService = ({ id }) => {
    return apiCaller.get(ENDPOINTS.farm.getDetail(id));
};

export const createFarmService = ({ name, description, status = "FALLOW", area }) => {
    return apiCaller.post(ENDPOINTS.farm.create, { name, description, status, area });
};

export const editFarmService = ({ id, name, description, status, area }) => {
    return apiCaller.put(ENDPOINTS.farm.edit(id), { name, description, status, area });
};

export const deleteFarmService = ({ id }) => {
    return apiCaller.delete(ENDPOINTS.farm.delete(id));
};

export const getPlantsToFarmByType = ({ typePlantId, pageNo = 0, pageSize = 100 }) => {
    return apiCaller.get(ENDPOINTS.farm.getPlantByType, {
        params: {
            typePlantId, pageNo, pageSize
        }
    })
}

export const editPlantToFarmService = ({ farm_id, plant_id_list }) => {
    return apiCaller.put(ENDPOINTS.farm.updatePlantToFarm, { farm_id, plant_id_list })
};

export const getPlantsOnFarmByIdService = ({ id }) => {
    return apiCaller.get(ENDPOINTS.farm.getAllPlantOnFarmById(id));
};