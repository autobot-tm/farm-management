import { apiCaller } from "../../axios/client";
import { ENDPOINTS } from "./api-endpoints.service";

export const fetchMonthlyPlantAndHarverstSummaryData = ({}) => {
  return apiCaller.get(ENDPOINTS.dashboard.getMonthlyPlantAndHarverstSummary);
};
