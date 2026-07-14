# API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

Semua protected endpoints memerlukan JWT token di Authorization header:

```bash
Authorization: Bearer <token>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...},
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": [{...}],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Endpoints

### Authentication

#### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "token": "jwt_token"
  }
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Logout

```http
POST /auth/logout
Authorization: Bearer <token>
```

### Staff Management

#### List Staff

```http
GET /staff?page=1&limit=10&search=john
Authorization: Bearer <token>
```

#### Get Staff Detail

```http
GET /staff/:id
Authorization: Bearer <token>
```

#### Create Staff

```http
POST /staff
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "staff@example.com",
  "name": "Staff Name",
  "phone": "08123456789",
  "department": "IT"
}
```

#### Update Staff

```http
PUT /staff/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "department": "HR"
}
```

#### Delete Staff

```http
DELETE /staff/:id
Authorization: Bearer <token>
```

### Roles & Permissions

#### List Roles

```http
GET /roles
Authorization: Bearer <token>
```

#### Create Role

```http
POST /roles
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Admin",
  "description": "Administrator role",
  "permissions": ["read", "write", "delete"]
}
```

#### Update Role

```http
PUT /roles/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Super Admin",
  "permissions": ["*"]
}
```

#### Assign Role to Staff

```http
POST /staff/:staffId/roles
Authorization: Bearer <token>
Content-Type: application/json

{
  "roleId": "role-uuid"
}
```

#### Remove Role from Staff

```http
DELETE /staff/:staffId/roles/:roleId
Authorization: Bearer <token>
```

### Audit & Analytics

#### Get Audit Logs

```http
GET /audit-logs?limit=50&offset=0&action=CREATE
Authorization: Bearer <token>
```

#### Get Dashboard Stats

```http
GET /dashboard/stats
Authorization: Bearer <token>
```

## Error Codes

| Code | Message |
|------|----------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/expired token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

## Rate Limiting

- 100 requests per 15 minutes per IP
- 1000 requests per hour per user

## Pagination

Use `page` and `limit` query parameters:

```http
GET /staff?page=1&limit=20
```
