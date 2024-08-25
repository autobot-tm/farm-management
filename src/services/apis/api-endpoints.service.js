export const ENDPOINTS = {
  auth: {
    login: "/api/v1/user/google-login",
  },
  user: {
    update: "/api/v1/user/update",
  },
  plants: {
    getByPaginate: "/api/v1/plant/findAll/paginate/",
    getByFilter: "getByFilter/all",
    getDetail: (id) => `/api/v1/plant/findById/${id}`,
    getType: "/api/v1/plant/findAllType",
    create: "/api/v1/plant/add",
    update: (id) => `/api/v1/plant/update/${id}`,
    delete: (id) => `/api/v1/plant/delete/${id}`,
  },
  dashboard: {
    getMonthlyPlantAndHarverstSummary: "/api/v1/dashboard/getMoneyDashboard",
  },
  farm: {
    getAll: "/api/v1/farm/findAll",
    getDetail: "/api/v1/farm/findById",
    create: "/api/v1/farm/add",
  }
};
