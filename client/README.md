# Kashvi Creations - React Client

This is the React frontend for Kashvi Creations e-commerce platform, built with Vite.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Environment Configuration

### Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure environment variables:
   ```env
   # Leave empty to use Vite proxy (recommended for local dev)
   VITE_BACKEND_URL=

   # Add your API keys
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_API_URL=your_gemini_api_url
   ```

3. The Vite dev server will proxy `/api/*` requests to `http://localhost:5000` automatically.

### Production Deployment (Vercel)

Set the following environment variables in your Vercel project settings:

```env
# Point to your backend server (e.g., Render)
VITE_BACKEND_URL=https://kashvi-creation-1.onrender.com

# Add your API keys
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_API_URL=your_gemini_api_url
```

## API Configuration

The application uses a centralized API helper (`src/lib/api.js`) that:

- **In development**: Uses empty `VITE_BACKEND_URL` so Vite proxy handles API requests
- **In production**: Uses the full backend URL from `VITE_BACKEND_URL` environment variable
- **Always**: Includes credentials for cookie-based authentication

All API calls are made through this helper to ensure consistency.

## Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite dev server on port 5173 with HMR and API proxy.

### Build
```bash
npm run build
```
Builds the app for production to the `dist` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally.

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality.

## Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set the root directory to `client`
3. Configure environment variables as shown above
4. Deploy!

Vercel will automatically detect the Vite configuration and build your project.

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Routing

## Official Plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
