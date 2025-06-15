🗺️ Auth Map App
A secure, interactive web app built with React, Firebase Authentication, and Leaflet that allows authenticated users to search two cities, get autocomplete suggestions using the Nominatim API, and draw a route between them on a map using Leaflet Routing Machine.

📌 Features
🔐 Google Authentication (Firebase)
Users must log in with Google to access the map functionality.

🗺️ Interactive Map with Leaflet
Map is displayed using Leaflet with OpenStreetMap tiles.

📍 Search & Autocomplete
Autocomplete suggestions powered by the Nominatim API (OpenStreetMap) for city search.

🧭 Route Plotting
Draws a route between two cities using Leaflet Routing Machine.

🚫 Protected Routes
Map page is restricted to authenticated users only.

⚙️ Error Handling & Loading State
Proper feedback for invalid input, loading state, and API errors.

🛠️ Technologies Used
React

Vite

Firebase Authentication

Leaflet

Leaflet Routing Machine

Nominatim API (OpenStreetMap)

React Router

Custom CSS Modules for styling

📁 Folder Structure

src/
├── components/
│   ├── MapComponent.jsx         # Map and search UI with routing
│   └── Navbar.jsx               # Top navigation bar with logout
├── pages/
│   ├── Login.jsx                # Google Sign-in screen
│   └── MapPage.jsx             # Protected map page after login
├── routes/
│   └── ProtectedRoute.jsx      # Auth route guard component
├── services/
│   └── firebase.jsx            # Firebase config & auth setup
├── App.jsx                     # App entry with routing logic
├── main.jsx                    # Vite entry point
└── index.css                   # Global styles

⚙️ Environment Variables
Create a .env file in the root directory with the following variables:

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com

Get these credentials from your Firebase Console > Project Settings.

📦 Installation & Running Locally
Clone the repository:
git clone https://github.com/your-username/auth-map-app.git
cd auth-map-app

Install dependencies:
npm install

Add environment variables:

Run the app:
npm run dev


🔐 Firebase Setup Instructions
Go to Firebase Console

Create a new project

Enable Authentication > Sign-in Method > Google

Copy API Key and Auth Domain to .env

Add your domain (http://localhost:5173 for Vite) to Firebase Authentication > Authorized domains


