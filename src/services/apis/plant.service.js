import { apiCaller } from "../../axios/client";
import { ENDPOINTS } from "./api-endpoints.service";

export const getPlantsService = ({ pageSize, pageNo }) => {
  console.log({ pageSize, pageNo });

  return apiCaller.get(ENDPOINTS.plants.getByPaginate, {
    params: {
      pageSize,
      pageNo,
    },
  });
};

export const fetchFilteredData = ({ }, { }) => {
  return apiCaller.get(ENDPOINTS.plants.getByFilter, {}, {});
};
