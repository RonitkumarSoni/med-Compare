# MedCompare Backend

Hyperlocal medicine price comparison platform backend.

## Tech Stack
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File handling
- **Geospatial Queries** - Nearby search logic

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (Atlas or local)
- Cloudinary account

### Installation
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `GEMINI_API_KEY` (if using chat assistant)

### Seeding Data
To populate the database with sample data:
```bash
npm run seed
```

### Running the Server
```bash
npm run dev
```

## Deployment Notes

### Render
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/`
- Set `CLIENT_URL` to your deployed frontend URL

### Frontend Integration
- Set frontend `VITE_API_BASE_URL` to your deployed backend URL, for example:
  `https://your-render-service.onrender.com/api`

## API Documentation

### Auth Module
- `POST /api/auth/register` - Register new user/pharmacy
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/update-profile` - Update profile details

### Medicine Module
- `GET /api/medicines` - List all medicines (with filters/search)
- `GET /api/medicines/compare?name=medicine` - Compare prices across pharmacies
- `GET /api/medicines/nearby?lng=x&lat=y&distance=5` - Find nearby medicines
- `POST /api/medicines` - Add new medicine (Pharmacy only)

### Pharmacy Module
- `GET /api/pharmacies` - List all pharmacies
- `GET /api/pharmacies/:id/analytics` - Get shop analytics (Owner only)

### Inquiry Module
- `POST /api/inquiries` - Send inquiry to pharmacy
- `PUT /api/inquiries/:id/respond` - Respond to inquiry (Pharmacy only)

### Admin Module
- `GET /api/admin/dashboard` - Get platform stats
- `PUT /api/admin/pharmacies/:id/verify` - Approve/Reject pharmacy

## Structure
- `src/config` - Database and 3rd party configs
- `src/controllers` - Route logic
- `src/models` - Mongoose schemas
- `src/routes` - API route definitions
- `src/middlewares` - Auth, error, and validation middlewares
- `src/utils` - Reusable helpers and seed scripts
