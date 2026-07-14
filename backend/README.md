# Indrabet Staff Permission - Backend API

Backend API untuk sistem manajemen izin staff Indrabet.

## Teknologi

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Validation:** Joi

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm atau yarn

### Installation

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Edit `.env` dengan konfigurasi database Anda:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/indrabet_staff_permission"
JWT_SECRET=your-secret-key
PORT=3001
```

### Database Migration

```bash
# Run migrations
npm run migrate

# (Optional) Seed dengan dummy data
npm run seed
```

## Running the Server

### Development

```bash
npm run dev
```

Server akan running di `http://localhost:3001`

### Production

```bash
npm start
```

## API Documentation

See [../docs/API.md](../docs/API.md)

## Project Structure

```
src/
├── config/          # Konfigurasi (database, env)
├── controllers/     # Request handlers
├── middlewares/     # Auth, validation, error handling
├── models/          # Business logic dan repository patterns
├── routes/          # API routes definition
├── utils/           # Helper functions
├── validators/      # Request validation schemas
└── index.js         # Server entry point

prisma/
├── schema.prisma    # Database schema
└── seed.js          # Database seeding script

tests/
├── unit/            # Unit tests
└── integration/     # Integration tests
```

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Linting & Formatting

```bash
# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format
```

## Database Commands

```bash
# Run migrations
npm run migrate

# Seed database
npm run seed

# Open Prisma Studio
npm run db:studio
```

## Error Handling

API menggunakan standardized error responses:

```json
{
  "success": false,
  "message": "Error message",
  "data": null,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Authentication

API menggunakan JWT untuk authentication. Include token di header:

```bash
Authorization: Bearer <your_token_here>
```

## Contributing

Lihat [../CONTRIBUTING.md](../CONTRIBUTING.md)
