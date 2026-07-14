# Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Git
- Docker (optional, untuk setup yang lebih mudah)

## Setup dengan Docker (Recommended)

### 1. Clone Repository

```bash
git clone https://github.com/AGUS88888/indrabet-staff-permission.git
cd indrabet-staff-permission
```

### 2. Start Services

```bash
docker-compose up -d
```

Services yang akan running:
- PostgreSQL di `localhost:5432`
- PgAdmin di `http://localhost:5050`
- Backend di `http://localhost:3001`
- Frontend di `http://localhost:5173`

### 3. Initialize Database

```bash
docker-compose exec backend npm run migrate
docker-compose exec backend npm run seed
```

### 4. Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api
- PgAdmin: http://localhost:5050
  - Email: admin@example.com
  - Password: admin

## Setup Manual (Tanpa Docker)

### 1. Clone Repository

```bash
git clone https://github.com/AGUS88888/indrabet-staff-permission.git
cd indrabet-staff-permission
```

### 2. Database Setup

#### Create PostgreSQL Database

```bash
psql -U postgres
```

```sql
CREATE DATABASE indrabet_staff_permission;
CREATE USER indrabet_user WITH PASSWORD 'indrabet_password';
ALTER ROLE indrabet_user SET client_encoding TO 'utf8';
ALTER ROLE indrabet_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE indrabet_user SET default_transaction_deferrable TO on;
ALTER ROLE indrabet_user SET default_time_zone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE indrabet_staff_permission TO indrabet_user;
\q
```

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://indrabet_user:indrabet_password@localhost:5432/indrabet_staff_permission"
JWT_SECRET=your-secret-key-here
PORT=3001
NODE_ENV=development
```

Run migrations:

```bash
npm run migrate
npm run seed  # Optional: seed dengan data dummy
```

Start backend:

```bash
npm run dev
```

Backend akan running di `http://localhost:3001`

### 4. Frontend Setup

Di terminal baru:

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

Start frontend:

```bash
npm run dev
```

Frontend akan accessible di `http://localhost:5173`

## Default Credentials

Setelah seeding, gunakan credential berikut untuk login:

```
Email: admin@example.com
Password: admin123
```

## Verification

### Check Backend

```bash
curl http://localhost:3001/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

### Check Frontend

Buka http://localhost:5173 di browser. Anda harus melihat login page.

## Troubleshooting

### Database Connection Error

```bash
# Test connection
psql postgresql://indrabet_user:indrabet_password@localhost:5432/indrabet_staff_permission
```

### Port Already in Use

Ubah port di `.env` atau kill process yang menggunakan port:

```bash
# Linux/Mac
lsof -i :3001
kill -9 <PID>

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Module Not Found

```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma Issues

```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (careful!)
npx prisma migrate reset
```

## Development Tools

### Database Studio

```bash
cd backend
npm run db:studio
```

Buka http://localhost:5555

### API Testing

Gunakan Postman atau Insomnia:

1. Import collection dari `docs/postman-collection.json` (jika ada)
2. Set environment variables
3. Test endpoints

## Next Steps

1. Explore codebase
2. Run tests
3. Create feature branch untuk development
4. Follow contributing guidelines

Untuk detail lebih lanjut, lihat:
- [README.md](../README.md)
- [API.md](./API.md)
- [DATABASE.md](./DATABASE.md)
