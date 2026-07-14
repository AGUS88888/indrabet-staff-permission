# Contributing to Indrabet Staff Permission System

Terima kasih untuk minat Anda dalam berkontribusi! Panduan ini akan membantu Anda memulai.

## Code of Conduct

Be respectful and constructive in all interactions.

## Getting Started

1. Fork repository ini
2. Clone fork Anda: `git clone https://github.com/YOUR_USERNAME/indrabet-staff-permission.git`
3. Add upstream: `git remote add upstream https://github.com/AGUS88888/indrabet-staff-permission.git`
4. Create feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

Ikuti instruksi di README.md untuk setup development environment.

## Commit Convention

Gunakan Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tools

Contoh:
```
feat(auth): add JWT token refresh endpoint

Add functionality to refresh expired JWT tokens
to improve user experience in long sessions.

Closes #123
```

## Pull Request Process

1. Pastikan branch Anda up-to-date dengan main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Push ke fork Anda:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Buat Pull Request dengan template yang disediakan

4. Pastikan CI/CD workflows passing

5. Tunggu code review dari maintainers

## Code Standards

### Backend (Node.js)
- ESLint configuration sudah disediakan
- Prettier untuk code formatting
- Tests diperlukan untuk feature baru
- Minimum test coverage: 80%

### Frontend (React)
- ESLint + Prettier sudah configured
- Component testing diperlukan
- Follow React best practices
- Accessibility (a11y) harus diperhatikan

## Testing

Semua feature baru harus memiliki tests:

```bash
# Backend
cd backend
npm test -- --testPathPattern=your-feature

# Frontend
cd frontend
npm test -- --testPathPattern=YourComponent
```

## Documentation

- Update README.md jika ada perubahan setup atau penggunaan
- Update docs/ untuk perubahan API atau database schema
- Comment kompleks logic dalam code
- Untuk fitur besar, buat documentation di docs/

## Review Process

1. Maintainer akan review PR Anda
2. Requests for changes akan dikirim jika diperlukan
3. Setelah approval, PR akan di-merge

## Questions?

Jika ada pertanyaan, buat issue atau diskusi di GitHub.

Terima kasih telah berkontribusi! 🎉
