export const ApiRoutes = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    LOGOUT: "/api/v1/auth/logout",
    REFRESH_TOKEN: "/api/v1/auth/refresh-token",
  },

  USER: {
    CREATE_EMP: "/api/v1/users/ create",
    GET_ALL: "/api/v1/users/all",
    UPDATE: (userId: string) => `/api/users/${userId}`,
  },

  ATTENDANCE: {
    ADMIN: "/api/v1/attendance",
    EMPLOYEE: "/api/v1/attendance/me",
    CHECK_IN: "/api/v1/attendance/checkin",
    CHECKED_IN: "/api/v1/attendance/status",
    CHECK_OUT: "/api/v1/attendance/checkout",
  },

  LEAVE_REQ: {
    BALANCE: "/api/v1/leave-request/balance",
  },
};
