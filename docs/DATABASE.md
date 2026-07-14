# Database Schema

## Overview

Database menggunakan PostgreSQL dengan ORM Prisma.

## Tables

### Users

User yang login ke sistem.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Staff

Data staff yang akan dikelola permission-nya.

```sql
CREATE TABLE staff (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  department VARCHAR(255),
  employee_id VARCHAR(50) UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Roles

Role yang dapat di-assign ke staff.

```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Permissions

Permission yang dapat di-assign ke role.

```sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  module VARCHAR(100),
  created_at TIMESTAMP DEFAULT now()
);
```

### RolePermissions

Relasi many-to-many antara role dan permission.

```sql
CREATE TABLE role_permissions (
  role_id UUID REFERENCES roles(id),
  permission_id UUID REFERENCES permissions(id),
  PRIMARY KEY (role_id, permission_id)
);
```

### StaffRoles

Relasi many-to-many antara staff dan role.

```sql
CREATE TABLE staff_roles (
  staff_id UUID REFERENCES staff(id),
  role_id UUID REFERENCES roles(id),
  assigned_at TIMESTAMP DEFAULT now(),
  assigned_by UUID REFERENCES users(id),
  PRIMARY KEY (staff_id, role_id)
);
```

### AuditLogs

Catatan aktivitas perubahan permission.

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  actor_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  old_value JSONB,
  new_value JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

## Relationships

```
Users (1) ---> (M) AuditLogs
Staff (1) ---> (M) StaffRoles (M) <--- (1) Roles
Roles (1) ---> (M) RolePermissions (M) <--- (1) Permissions
```

## Indexes

```sql
CREATE INDEX idx_staff_email ON staff(email);
CREATE INDEX idx_staff_active ON staff(is_active);
CREATE INDEX idx_roles_name ON roles(name);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
```

## Seeding

Default roles dan permissions:

### Roles
- **Admin** - Full access
- **Manager** - Can manage staff and roles
- **Staff** - Can view own data
- **Guest** - Read-only access

### Permissions
- `staff:read` - View staff data
- `staff:create` - Create new staff
- `staff:update` - Update staff data
- `staff:delete` - Delete staff
- `roles:read` - View roles
- `roles:create` - Create roles
- `roles:update` - Update roles
- `roles:delete` - Delete roles
- `audit:read` - View audit logs
