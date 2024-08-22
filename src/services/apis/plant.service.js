import { apiCaller } from "../../axios/client";
import { ENDPOINTS } from "./api-endpoints.service";

export const getPlantsService = ({ pageSize, pageNo }) => {
  return apiCaller.get(ENDPOINTS.plants.getByPaginate, {
    params: {
      pageSize,
      pageNo,
    },
  });
};

export const fetchFilteredData = ({ }) => {
  return apiCaller.get(ENDPOINTS.plants.getByFilter, {});
};

export const getPlantDetailById = ({ id }) => {
  return apiCaller.get(ENDPOINTS.plants.getDetail(id));
};

export const createPlant = ({
  name,
  description,
  seedling_day,
  vegetative_stage_day,
  flowering_stage_day,
  fruiting_stage_day,
  area,
  expected_yield,
  price,
  type_plant_id }) => {
  return apiCaller.post(ENDPOINTS.plants.create, {
    name,
    description,
    seedling_day,
    vegetative_stage_day,
    flowering_stage_day,
    fruiting_stage_day,
    area,
    expected_yield,
    price,
    type_plant_id
  });
};

export const fetchPlantTypeService = () => {
  return apiCaller.get(ENDPOINTS.plants.getType);
};

export const updatePlant = ({
  id,
  name,
  description,
  seedling_day,
  vegetative_stage_day,
  flowering_stage_day,
  fruiting_stage_day,
  area,
  expected_yield,
  price,
  type_plant_id }) => {
  return apiCaller.put(ENDPOINTS.plants.update(id), {
    name,
    description,
    seedling_day,
    vegetative_stage_day,
    flowering_stage_day,
    fruiting_stage_day,
    area,
    expected_yield,
    price,
    type_plant_id
  });
};

export const deletePlant = ({ id }) => {
  return apiCaller.delete(ENDPOINTS.plants.delete(id))
}
