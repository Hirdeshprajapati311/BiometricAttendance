# API Documentation

## Authentication

| Method | Endpoint                   | Description   |
| ------ | -------------------------- | ------------- |
| POST   | /api/v1/auth/login         | Login user    |
| POST   | /api/v1/auth/register      | Register user |
| POST   | /api/v1/auth/logout        | Logout user   |
| POST   | /api/v1/auth/refresh-token | Refresh JWT   |

---

## Attendance

| Method | Endpoint                    | Description         |
| ------ | --------------------------- | ------------------- |
| GET    | /api/v1/attendance          | Admin attendance    |
| GET    | /api/v1/attendance/me       | Employee attendance |
| POST   | /api/v1/attendance/checkin  | Check in            |
| POST   | /api/v1/attendance/checkout | Check out           |
| GET    | /api/v1/attendance/status   | Current status      |
| GET    | /api/v1/attendance/chart    | Attendance chart    |

---

## Dashboard

| Method | Endpoint                     | Description       |
| ------ | ---------------------------- | ----------------- |
| GET    | /api/v1/dashboard/summary    | Dashboard summary |
| GET    | /api/v1/dashboard/graphChart | Graph data        |
| GET    | /api/v1/dashboard/barChart   | Bar chart data    |

---

## Leave Requests

| Method | Endpoint                           | Description            |
| ------ | ---------------------------------- | ---------------------- |
| GET    | /api/v1/leave-request/balance      | Leave balance          |
| POST   | /api/v1/leave-request/create       | Create leave           |
| GET    | /api/v1/leave-request/me           | Employee leave history |
| GET    | /api/v1/leave-request              | Admin leave list       |
| PATCH  | /api/v1/leave-request/:id          | Approve / Reject       |
| PATCH  | /api/v1/leave-request/withdraw/:id | Withdraw leave         |
