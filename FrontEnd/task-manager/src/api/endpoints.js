export const AUTH_ENDPOINTS = {

  login: "/Auth/login",

  register: "/Auth/register",
  getusers: "/Auth/getUsers",
};


export const TASK_ENDPOINTS = {

  getAllTasks: "/Tasks",
  getMyTasks : "/Tasks/mytasks" ,
  createTask: "/Tasks",
  getTaskById: (id) =>
    `/Tasks/${id}`,

  updateTask: (id) =>
    `/Tasks/${id}`,

  deleteTask: (id) =>
    `/Tasks/${id}`,
};


export const USER_ENDPOINTS = {

  getAllUsers: "/Users",

  getUserById: (id) =>
    `/Users/${id}`,
};