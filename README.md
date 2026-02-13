# Kashvi Creations E-Commerce Platform

A **full-stack e-commerce website** built for Kashvi Creations, a local store based in Surat, Gujarat. This platform delivers a seamless online shopping experience, featuring robust security, smart automation, and an intuitive admin panel for efficient store management.

---

## 🚀 Features

- **Secure User Authentication**
  - User registration & login
  - Forgot password functionality
  - Personalized wishlist for each user

- **Enhanced User Experience**
  - Integrated AI-powered chatbot for instant customer support
  - Real-time order tracking system
  - Payment gateway integration (Razorpay)

- **Powerful Admin Panel**
  - Product management dashboard
  - User query handling
  - Bulk messaging to users

- **Rich Shopping Experience**
  - Advanced product filtering & sorting
  - Responsive design for optimal browsing on all devices

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MongoDB
- **Media Storage:** Cloudinary
- **Payments:** Razorpay

---


## ⚙️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/kashvi-creations-ecommerce.git
   ```

2. **Install dependencies for both client and server:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Configure environment variables:**
   
   **Client (.env):**
   - Copy `client/.env.example` to `client/.env`
   - For **local development**:
     ```env
     # Leave VITE_BACKEND_URL empty to use Vite proxy
     VITE_BACKEND_URL=
     REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     VITE_API_URL=your_gemini_api_url
     ```
   - For **production deployment** (Vercel):
     ```env
     # Set to your Render backend URL
     VITE_BACKEND_URL=https://kashvi-creation-1.onrender.com
     REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     VITE_API_URL=your_gemini_api_url
     ```
   
   **Server (.env):**
   - Add MongoDB URI, Cloudinary credentials, Razorpay keys, and other necessary environment variables.
   - Ensure `NODE_ENV=production` is set for production deployment
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   # ... other variables
   ```

4. **Run the application:**
   - **Client:**
     ```bash
     cd client
     npm run dev
     ```
   - **Server:**
     ```bash
     cd server
     npm run dev
     ```

---

## 🔒 Security Best Practices

**Important:** The repository currently has `.env` files committed to git. While these are being used for the current deployment, this is not a recommended security practice.

**Recommendations:**
1. **For new secrets**: Use environment variables in your deployment platform (Vercel, Render) instead of committing them
2. **Rotate existing secrets**: If possible, generate new API keys and secrets, configure them in your deployment platform, and remove the old ones from git history
3. **Use .env.example**: The `.env.example` file shows what variables are needed without exposing actual values

**Note:** This PR adds `.env` to `.gitignore` to prevent future commits of environment files, but existing files remain to avoid breaking current deployments.

---

## 🚀 Deployment

### Deploying to Vercel (Client) and Render (Server)

**Client (Vercel):**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard:
   - `VITE_BACKEND_URL=https://kashvi-creation-1.onrender.com` (or your Render backend URL)
   - `REACT_APP_GOOGLE_MAPS_API_KEY=your_key`
   - `VITE_API_URL=your_gemini_url`
4. Deploy from the `client` directory

**Server (Render):**
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure build settings:
   - Build Command: `npm install`
   - Start Command: `npm start` or `node server.js`
   - Root Directory: `server`
4. Add environment variables:
   - `NODE_ENV=production`
   - `MONGO_URI=your_mongodb_uri`
   - `JWT_SECRET=your_jwt_secret`
   - Add other required environment variables
5. Ensure CORS origins in `server.js` include your Vercel domain(s)

**Important Notes:**
- The client uses a centralized API helper (`client/src/lib/api.js`) that automatically switches between local proxy and production backend based on `VITE_BACKEND_URL`
- In production, cookies use `SameSite=None; Secure` for cross-origin authentication
- CORS is configured to accept requests from Vercel domains

---

## 💡 Project Highlights

- **AI Chatbot:** Automates common queries, improving customer engagement.
- **Bulk Messaging:** Admins can send announcements or promotions to all users.
- **Real-Time Tracking:** Users get updates on their order status as it progresses.
- **Scalable Infrastructure:** Built to accommodate growth in both users and products.


---

## 📄 License

This project is for educational and demonstration purposes.
