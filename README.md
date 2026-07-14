# Indrabet Staff Permission System

Sistem manajemen izin dan akses staff untuk platform Indrabet. Aplikasi ini memungkinkan administrator untuk mengelola role, permission, dan akses staff secara efisien.

## Fitur Utama

- 👥 **Manajemen Staff** - Tambah, edit, hapus data staff
- 🔐 **Role & Permission** - Kelola role dan permission dengan granular control
- 📋 **Audit Trail** - Pencatatan aktivitas perubahan permission
- 📊 **Dashboard Analytics** - Dashboard untuk monitoring akses staff
- 🔔 **Notifikasi** - Notifikasi perubahan permission
- 📱 **Responsive UI** - Interface yang responsif untuk desktop dan mobile

## Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT + Bcrypt
- **Validation:** Joi
- **Testing:** Jest + Supertest

### Frontend
- **Framework:** React 18+
- **UI Library:** Tailwind CSS + Shadcn/ui
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Testing:** Vitest + React Testing Library

## Struktur Direktori

```
indrabet-staff-permission/
├── backend/              # API Server
│   ├── src/
│   │   ├── config/       # Konfigurasi database, env
│   │   ├── controllers/  # Request handlers
│   │   ├── middlewares/  # Authentication, validation
│   │   ├── models/       # Business logic
│   │   ├── routes/       # API routes
│   │   ├── utils/        # Helper functions
│   │   └── app.js        # Express app setup
│   ├── prisma/           # Database schema & migrations
│   ├── tests/            # Unit & integration tests
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/             # React Web App
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API services
│   │   ├── utils/        # Utility functions
│   │   ├── styles/       # Global styles
│   │   └── App.jsx
│   ├── public/           # Static assets
│   ├── tests/            # Component tests
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── docs/                 # Documentation
│   ├── API.md            # API Documentation
│   ├── DATABASE.md       # Database Schema
│   ├── SETUP.md          # Setup Guide
│   └── DEPLOYMENT.md     # Deployment Guide
├── docker-compose.yml    # Docker compose untuk development
├── .github/
│   └── workflows/        # CI/CD workflows
├── .gitignore
├── LICENSE
└── CONTRIBUTING.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Git

### Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan konfigurasi database Anda
npm run migrate
npm run seed    # Optional: seed dengan data dummy
npm run dev
```

### Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Menggunakan Docker

```bash
docker-compose up -d
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token

### Staff Management
- `GET /api/staff` - List semua staff
- `GET /api/staff/:id` - Detail staff
- `POST /api/staff` - Tambah staff
- `PUT /api/staff/:id` - Update staff
- `DELETE /api/staff/:id` - Hapus staff

### Roles & Permissions
- `GET /api/roles` - List roles
- `POST /api/roles` - Buat role baru
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Hapus role
- `GET /api/permissions` - List permissions
- `POST /api/staff/:id/roles` - Assign role ke staff
- `DELETE /api/staff/:id/roles/:roleId` - Revoke role

### Audit & Analytics
- `GET /api/audit-logs` - Audit trail
- `GET /api/dashboard/stats` - Dashboard statistics

## Testing

```bash
# Backend
cd backend
npm test
npm run test:coverage

# Frontend
cd frontend
npm test
npm run test:coverage
```

## Development

```bash
# Start dev server dengan hot reload
cd backend && npm run dev

# Di terminal lain
cd frontend && npm run dev
```

## Linting & Formatting

```bash
cd backend
npm run lint
npm run format

cd frontend
npm run lint
npm run format
```

## Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## Environment Variables

See `.env.example` files in `backend/` dan `frontend/` directories

## Contributing

Pada PR, pastikan:
1. Code sudah di-lint dan di-format
2. Semua tests passing
3. Commit message mengikuti conventional commits
4. Dokumentasi updated

Lihat [CONTRIBUTING.md](./CONTRIBUTING.md) untuk detail lebih lanjut.

## License

MIT License - See [LICENSE](./LICENSE)

## Support

Jika ada pertanyaan atau issue, silakan buat issue di repository ini atau hubungi tim development.
