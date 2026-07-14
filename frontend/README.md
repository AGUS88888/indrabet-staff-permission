# Indrabet Staff Permission - Frontend

Frontend aplikasi untuk sistem manajemen izin staff Indrabet.

## Teknologi

- **Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Routing:** React Router v6

## Setup

### Prerequisites
- Node.js 18+
- npm atau yarn

### Installation

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Edit `.env` dengan konfigurasi Anda:

```env
VITE_API_URL=http://localhost:3001/api
```

## Running the App

### Development

```bash
npm run dev
```

App akan accessible di `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/      # Reusable React components
│   ├── common/      # Common components (Header, Sidebar, etc)
│   ├── forms/       # Form components
│   └── ui/          # UI components
├── pages/           # Page components
├── store/           # Redux store & slices
├── hooks/           # Custom React hooks
├── services/        # API service layer
├── utils/           # Utility functions
├── styles/          # Global CSS
├── App.jsx          # Main app component
└── main.jsx         # Entry point

public/             # Static assets
tests/              # Component tests
```

## Testing

```bash
# Run tests
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

## Features

- ✅ Responsive design dengan Tailwind CSS
- ✅ State management dengan Redux Toolkit
- ✅ API integration dengan Axios
- ✅ Protected routes dengan authentication
- ✅ Error handling & notifications
- ✅ Loading states & skeletons
- ✅ Pagination & filtering

## Contributing

Lihat [../CONTRIBUTING.md](../CONTRIBUTING.md)
