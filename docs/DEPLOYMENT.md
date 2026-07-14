# Deployment Guide

## Prerequisites

- Server dengan Node.js 18+
- PostgreSQL 12+
- Nginx atau Apache untuk reverse proxy
- SSL certificate (Let's Encrypt recommended)
- Domain name

## Deployment Options

### 1. Deploy ke VPS (Traditional)

#### Step 1: SSH ke Server

```bash
ssh user@your-server-ip
```

#### Step 2: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx
```

#### Step 3: Clone Repository

```bash
cd /var/www
sudo git clone https://github.com/AGUS88888/indrabet-staff-permission.git
cd indrabet-staff-permission
sudo chown -R $USER:$USER .
```

#### Step 4: Setup Backend

```bash
cd backend
npm install
npm run build  # If needed
cp .env.example .env
```

Edit `.env` dengan production settings:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/indrabet_prod"
NODE_ENV=production
JWT_SECRET=your-production-secret
PORT=3001
```

#### Step 5: Setup Frontend

```bash
cd ../frontend
npm install
npm run build
```

#### Step 6: Setup Database

```bash
# Login ke PostgreSQL
sudo -u postgres psql
```

```sql
CREATE DATABASE indrabet_prod;
CREATE USER indrabet_prod WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE indrabet_prod TO indrabet_prod;
\q
```

```bash
cd backend
npm run migrate:prod
```

#### Step 7: Setup PM2 untuk Backend

```bash
sudo npm install -g pm2
cd /var/www/indrabet-staff-permission/backend
pm2 start "npm start" --name "indrabet-backend"
pm2 startup
pm2 save
```

## Post-Deployment

### 1. Verify Deployment

```bash
curl https://your-domain.com/api/health
```

### 2. Setup Monitoring

Install dan configure monitoring tools:

- **PM2 Plus** untuk monitoring process
- **Sentry** untuk error tracking
- **DataDog** untuk infrastructure monitoring

### 3. Backup Strategy

```bash
# Daily PostgreSQL backup
0 2 * * * pg_dump -h localhost -U indrabet_prod indrabet_prod | gzip > /backups/db_$(date +\%Y\%m\%d).sql.gz
```

### 4. Log Management

```bash
# Check logs
pm2 logs indrabet-backend
```

## Health Checks

```bash
# Backend health
curl http://localhost:3001/api/health

# Database
psql -h localhost -U indrabet_prod -d indrabet_prod -c "SELECT NOW();"
```

## Maintenance

### Regular Updates

```bash
# Update dependencies
cd backend && npm update
cd frontend && npm update

# Rebuild
npm run build

# Restart services
pm2 restart indrabet-backend
```
