# Pixora AI — Neural Image Enhancement Suite

> **Pixora AI** is a full-stack AI-powered image enhancement web application with Firebase Authentication, a premium glassmorphism UI, and a FastAPI backend — all accessible through a modern, animated browser interface.

---

## ✨ What's New (September 2026)

- 🔐 **Firebase Authentication** — Email/Password + Google Sign-In, auth-gated app
- 🎨 **Premium UI Overhaul** — Dark glassmorphism design, Framer Motion animations, modular React components
- 🌟 **Custom Favicon** — Branded Pixora sparkle icon
- 🔒 **Secure Config** — Firebase credentials stored in `.env`, never committed
- 🧩 **Modular Architecture** — Split into Hero, Navbar, Studio, Capabilities, Workflow, Footer components

---

## 🎨 What is Pixora AI?

Pixora AI transforms ordinary images using a mix of classical and deep-learning computer vision techniques. Whether you want to restore old photos, remove backgrounds, sharpen blurry shots, or enhance facial features — Pixora handles it all in seconds, right from your browser.

Users must sign in via **Firebase Auth** before accessing the Studio, keeping the app secure.

---

## 🔐 Authentication

Pixora uses **Firebase Authentication** with two sign-in methods:

| Method | Details |
|--------|---------|
| 📧 **Email / Password** | Create account + sign in with email |
| 🔵 **Google Sign-In** | One-click Google OAuth popup |

Auth state is managed globally via `AuthContext` — unauthenticated users see the login page; authenticated users get full Studio access.

---

## 🛠️ AI Enhancement Features

| Enhancement | Description |
|---|---|
| 🔇 **Denoise** | Remove noise and grain using OpenCV's Non-Local Means denoising |
| ☀️ **Brightness & Contrast** | Auto-correct exposure and contrast |
| 🔍 **Super Resolution** | Upscale image resolution 4× using the FSRCNN deep learning model |
| ✏️ **Sharpen** | Enhance edges and fine details with a convolution sharpening kernel |
| 🪄 **Enhance All** | Full pipeline: denoise → brightness → sharpen → super resolution in one click |
| 🧹 **Background Remove** | Cleanly remove image backgrounds using `rembg` |
| 🌈 **HDR Filter** | Apply a high-dynamic-range tone-mapping effect using OpenCV's detail enhancer |
| 👤 **Face Enhance** | AI face restoration with bilateral smoothing, CLAHE, adaptive gamma, and unsharp masking |

---

## 🏗️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | Core UI library with hooks for state management |
| **Vite** | Build tool and dev server with instant HMR |
| **Tailwind CSS** | Utility-first CSS framework for all styling |
| **Framer Motion** | Animations, transitions, page reveals |
| **Firebase (v11)** | Authentication — Email/Password + Google Sign-In |
| **react-compare-image** | Interactive before/after drag slider |
| **react-dropzone** | Drag-and-drop image upload with file validation |
| **react-icons** | Icon set for buttons and menus |
| **Axios** | HTTP client for backend API calls |
| **Lucide React** | Additional icon library for UI elements |

### Backend

| Technology | Purpose |
|---|---|
| **FastAPI** | Python web framework — exposes each enhancement as a REST endpoint |
| **Uvicorn** | ASGI server that runs the FastAPI app |
| **OpenCV** (`opencv-contrib-python-headless`) | Core image processing — denoising, sharpening, super resolution, HDR, face detection |
| **NumPy** | Image byte-to-array conversion for OpenCV |
| **rembg** | Background removal using U2-Net |
| **SciPy / scikit-image** | Supplementary image processing utilities |

---

## 📁 Project Structure

```
AI Image Enhancement Suite/
├── backend/
│   ├── app.py                  # FastAPI app + all endpoints
│   ├── enhancement/            # Enhancement modules
│   │   ├── denoising.py
│   │   ├── super_resolution.py
│   │   ├── face_enhancement.py
│   │   └── ...
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── favicon.png         # Pixora branded favicon
│   ├── src/
│   │   ├── firebase.js         # Firebase app init (reads from .env)
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state provider
│   │   ├── pages/
│   │   │   └── AuthPage.jsx    # Login / Sign-up UI
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Nav with user avatar + sign out
│   │   │   ├── Hero.jsx        # Landing hero section
│   │   │   ├── Capabilities.jsx
│   │   │   ├── Workflow.jsx
│   │   │   ├── Showcase.jsx
│   │   │   ├── StatsMarquee.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Studio/
│   │   │       ├── Studio.jsx          # Main enhancement studio
│   │   │       ├── UploadZone.jsx
│   │   │       ├── Toolbox.jsx
│   │   │       ├── ComparisonViewer.jsx
│   │   │       ├── HistoryStrip.jsx
│   │   │       └── ProcessingModal.jsx
│   │   ├── App.jsx             # Root — auth-gated routing
│   │   └── main.jsx
│   ├── .env                    # 🔒 Firebase credentials (gitignored)
│   ├── .env.example            # Template — copy this to .env
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- A Firebase project with Authentication enabled

---

### 1. Clone the Repo

```bash
git clone https://github.com/Riticaa/AI-IMAGE-ENHANCEMENT-SUITE.git
cd AI-IMAGE-ENHANCEMENT-SUITE
```

---

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv ../venv

# Windows
..\venv\Scripts\activate

# macOS / Linux
source ../venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend (must run from /backend directory)
uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```

> ⚠️ **Important:** Always run `uvicorn` from inside the `/backend` directory — relative imports depend on it.

---

### 3. Firebase Setup

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a project → register a **Web App**
3. Copy your config from **Project Settings → SDK setup**
4. Go to **Authentication → Sign-in method** → enable:
   - ✅ Email/Password
   - ✅ Google
5. Go to **Authentication → Settings → Authorized domains** → add `127.0.0.1`

---

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy the env template and fill in your Firebase credentials
cp .env.example .env
```

Edit `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

```bash
# Start the dev server
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173) — you'll see the Pixora login page.

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase Analytics measurement ID |

> 🔒 The `.env` file is **gitignored** — never commit your real credentials.

---

## 🖥️ Usage

1. Open the app and **Sign In** (Google or Email/Password)
2. You'll land on the Pixora home page
3. Click **Launch Studio** or scroll to the Studio section
4. **Upload an image** via drag-and-drop or file picker
5. Select an enhancement from the **Toolbox**
6. Download the enhanced result with one click
7. Use the **before/after slider** to compare results

---

## 📸 Screenshots

| Login Page | Studio |
|---|---|
| Firebase Auth — Email + Google | AI enhancement with before/after comparison |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
