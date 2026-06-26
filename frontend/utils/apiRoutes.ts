export const ApiRoutes = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    REFRESH_TOKEN: "/api/auth/refresh-token",
  },

  USER: {
    CREATE_EMP: "/api/users/create",
    GET_ALL: "/api/users/all",
  },

  ATTENDANCE: {
    ADMIN: "/api/attendance",
    EMPLOYEE: "/api/attendance/me",
  },
};
