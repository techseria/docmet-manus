# Deployment Guide for Docmet Website

This guide provides comprehensive instructions for deploying the Docmet website to production.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides excellent Next.js hosting with automatic deployments.

#### Prerequisites
- Vercel account
- GitHub repository
- PostgreSQL database (recommended for production)

#### Steps
1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   ```env
   DATABASE_URI=postgresql://username:password@host:port/database
   PAYLOAD_SECRET=your-super-secret-key-here
   NEXT_PUBLIC_SERVER_URL=https://your-domain.vercel.app
   SITE_URL=https://your-domain.vercel.app
   ```

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

#### Database Setup for Vercel
```bash
# Install Vercel Postgres adapter
npm install @payloadcms/db-vercel-postgres
```

Update `payload.config.ts`:
```typescript
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export default buildConfig({
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  // ... rest of config
})
```

### Option 2: Netlify

#### Prerequisites
- Netlify account
- GitHub repository
- External PostgreSQL database

#### Steps
1. **Connect Repository**
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment Variables**
   Set the same environment variables as listed in the Vercel section.

### Option 3: DigitalOcean App Platform

#### Prerequisites
- DigitalOcean account
- GitHub repository
- DigitalOcean Managed PostgreSQL database

#### Steps
1. **Create App**
   - Go to DigitalOcean Apps
   - Create new app from GitHub

2. **Configure Service**
   - Type: Web Service
   - Source: Your GitHub repository
   - Build Command: `npm run build`
   - Run Command: `npm start`

3. **Add Database**
   - Create DigitalOcean Managed PostgreSQL database
   - Add database connection string to environment variables

### Option 4: Self-Hosted VPS

#### Prerequisites
- VPS with Node.js 18+ and npm
- PostgreSQL database
- Domain name with SSL certificate

#### Steps
1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   
   # Install Nginx for reverse proxy
   sudo apt install nginx
   ```

2. **Clone and Build**
   ```bash
   # Clone repository
   git clone <your-repo-url> docmet-website
   cd docmet-website
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   ```

3. **Environment Configuration**
   ```bash
   # Create .env file
   nano .env
   ```
   
   Add production environment variables:
   ```env
   DATABASE_URI=postgresql://username:password@localhost:5432/docmet
   PAYLOAD_SECRET=your-super-secret-key-here
   NEXT_PUBLIC_SERVER_URL=https://your-domain.com
   SITE_URL=https://your-domain.com
   NODE_ENV=production
   ```

4. **Start with PM2**
   ```bash
   # Start application
   pm2 start npm --name "docmet" -- start
   
   # Save PM2 configuration
   pm2 save
   pm2 startup
   ```

5. **Nginx Configuration**
   ```nginx
   # /etc/nginx/sites-available/docmet
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   # Enable site
   sudo ln -s /etc/nginx/sites-available/docmet /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

6. **SSL with Let's Encrypt**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Get SSL certificate
   sudo certbot --nginx -d your-domain.com
   ```

## 🗄️ Database Migration

### From SQLite to PostgreSQL

1. **Export Data from SQLite**
   ```bash
   # Use Payload's built-in export
   npm run payload migrate:create
   ```

2. **Set up PostgreSQL**
   ```bash
   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib
   
   # Create database and user
   sudo -u postgres psql
   CREATE DATABASE docmet;
   CREATE USER docmet_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE docmet TO docmet_user;
   \q
   ```

3. **Update Configuration**
   ```bash
   # Install PostgreSQL adapter
   npm install @payloadcms/db-postgres
   ```
   
   Update `payload.config.ts`:
   ```typescript
   import { postgresAdapter } from '@payloadcms/db-postgres'
   
   export default buildConfig({
     db: postgresAdapter({
       pool: {
         connectionString: process.env.DATABASE_URI,
       },
     }),
     // ... rest of config
   })
   ```

4. **Run Migrations**
   ```bash
   npm run payload migrate
   ```

## 🔒 Security Checklist

### Environment Variables
- [ ] Use strong, unique `PAYLOAD_SECRET`
- [ ] Secure database credentials
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS settings

### Server Security
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall (UFW)
- [ ] Regular security updates
- [ ] Database access restrictions
- [ ] Backup strategy

### Application Security
- [ ] Rate limiting enabled
- [ ] Input validation
- [ ] CSRF protection
- [ ] Secure headers
- [ ] Content Security Policy

## 📊 Monitoring & Analytics

### Performance Monitoring
```bash
# Install monitoring tools
npm install @vercel/analytics
```

### Error Tracking
```bash
# Install Sentry for error tracking
npm install @sentry/nextjs
```

### Analytics
- Google Analytics 4
- Vercel Analytics
- Custom event tracking

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      # Add deployment steps here
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Verify environment variables
   - Clear `.next` cache

2. **Database Connection**
   - Verify connection string
   - Check firewall settings
   - Ensure database is running

3. **Performance Issues**
   - Enable caching
   - Optimize images
   - Use CDN for static assets

### Logs and Debugging
```bash
# View PM2 logs
pm2 logs docmet

# View Nginx logs
sudo tail -f /var/log/nginx/error.log

# Check application status
pm2 status
```

## 📋 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test admin panel functionality
- [ ] Check SEO meta tags
- [ ] Validate sitemap.xml
- [ ] Test contact forms
- [ ] Verify SSL certificate
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test mobile responsiveness
- [ ] Check Core Web Vitals

## 🔄 Maintenance

### Regular Tasks
- Weekly security updates
- Monthly dependency updates
- Quarterly performance reviews
- Database backups (daily)
- SSL certificate renewal (automatic with Let's Encrypt)

### Scaling Considerations
- Database connection pooling
- CDN for static assets
- Load balancing for high traffic
- Caching strategies
- Image optimization

---

For additional support, refer to the [Payload CMS deployment documentation](https://payloadcms.com/docs/production/deployment) and [Next.js deployment guide](https://nextjs.org/docs/deployment).

