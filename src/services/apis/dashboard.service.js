import { apiCaller } from "../../axios/client";
import { ENDPOINTS } from "./api-endpoints.service";

export const fetchMonthlyPlantAndHarverstSummaryData = () => {
  return apiCaller.get(ENDPOINTS.dashboard.getMonthlyPlantAndHarverstSummary);
};

export const fetchTotalPlantedAreaAllFarm = () => {
  return apiCaller.get(ENDPOINTS.dashboard.getTotalPlantedAreAllFarm);
};

export const fetchReportDashboard = ({ month, year }) => {
  return apiCaller.get(ENDPOINTS.dashboard.getReportDashboard, { params: month, year });
};
