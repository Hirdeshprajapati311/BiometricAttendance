# Changelog

## v1.0

### Added

- Authentication
- Attendance Management
- Leave Management
- Employee Dashboard
- Admin Dashboard

## v1.1

### Changed

utility/
-asycnHandler
-ApiError

- Refactored backend controllers to use a reusable `asyncHandler` for centralized asynchronous error handling.
- Introduced a reusable `ApiError` class to standardize API error responses.
- Centralized error handling through a global Express error middleware, reducing duplicated error handling logic across controllers.
