# Pixora — AI Image Enhancement Suite

> **Pixora** is a multi-functional AI-powered image enhancement web application that lets you upload photos and apply intelligent enhancements — all through a clean, modern browser interface.

**🌐 Live Demo:** [https://ai-image-enhancement-suite.vercel.app/](https://ai-image-enhancement-suite.vercel.app/)

---

## 🎨 What is Pixora?

Pixora transforms ordinary images using a mix of classical and deep-learning computer vision techniques. Whether you want to restore old photos, remove backgrounds, sharpen blurry shots, or enhance facial features — Pixora handles it all in seconds, right from your browser.

---

## Features

| Enhancement | Description |
|---|---|
| 🔇 **Denoise** | Remove noise and grain using OpenCV's Non-Local Means denoising |
| ☀️ **Brightness & Contrast** | Auto-correct exposure and contrast |
| 🔍 **Super Resolution** | Upscale image resolution 4× using the FSRCNN deep learning model (via OpenCV's DNN Super Resolution module) |
| ✏️ **Sharpen** | Enhance edges and fine details with a convolution sharpening kernel |
| 🪄 **Enhance All** | Full pipeline: denoise → brightness → sharpen → super resolution in one click |
| 🧹 **Background Remove** | Cleanly remove image backgrounds using `rembg` |
| 🌈 **HDR Filter** | Apply a high-dynamic-range tone-mapping effect using OpenCV's detail enhancer |
| 👤 **Face Enhance** | Detect faces (Haar Cascade) and enhance them with a custom OpenCV pipeline — upscaling, bilateral smoothing, CLAHE, adaptive gamma/white balance, and unsharp masking, seamlessly blended back into the original image |

---

## 🏗️ Tech Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **react-compare-image** for before/after sliders
- **react-dropzone** for drag-and-drop uploads
- **react-fast-marquee** and **react-icons** for UI elements
- **Axios** for API communication

### Backend
- **FastAPI** (Python)
- **OpenCV** (`opencv-contrib-python-headless`) for image processing and DNN-based super resolution
- **NumPy**, **SciPy**, **scikit-image**, **Pillow** for image/array processing
- **rembg** (ONNX Runtime-based) for background removal
- **Uvicorn** as the ASGI server

> Note: face enhancement and super resolution currently run on classical OpenCV/DNN pipelines rather than GFPGAN or Real-ESRGAN — there's no PyTorch dependency in `requirements.txt` at the moment. An `EDSR_x4.pb` model ships in `backend/enhancement/models/` alongside `FSRCNN_x4.pb`, but only FSRCNN is currently wired up in `super_resolution.py`.

---

## 🚀 Deployment

### Frontend — Vercel
The Pixora frontend is deployed on **[Vercel](https://vercel.com/)** for fast, globally distributed hosting.

- **Live URL:** [https://ai-image-enhancement-suite.vercel.app/](https://ai-image-enhancement-suite.vercel.app/)
- Built with Vite and served as a static SPA
- Auto-deploys on every push to the `master` branch

### Backend — Hugging Face Spaces
The Pixora backend (FastAPI server) is deployed as a **[Hugging Face Space](https://huggingface.co/spaces)** with **public access** — no authentication required.

- Runs inside a **Docker container** (Python 3.10 slim base image)
- Installs `ffmpeg` and `libgl1` as system dependencies (required by OpenCV)
- Exposed on port **7860** (Hugging Face's default port)
- Publicly accessible to all users
- Dockerfile located at `backend/Dockerfile`

```
Backend Base URL: https://huggingface.co/spaces/Riticaa/ai-image-enhancement-suite
```

---

## 📁 Project Structure

```
Pixora/
├── backend/
│   ├── app.py                    # FastAPI app with all enhancement endpoints
│   ├── requirements.txt          # Python dependencies
│   ├── Dockerfile                # Docker config for Hugging Face Spaces deployment
│   ├── runtime.txt                # python-3.10.10
│   ├── packages.txt                # ffmpeg, libgl1 (system deps)
│   ├── enhancement/
│   │   ├── denoising.py
│   │   ├── color_correction.py
│   │   ├── super_resolution.py
│   │   ├── sharpen.py
│   │   ├── background_remove.py
│   │   ├── hdr_filter.py
│   │   ├── face_enhance_v2.py
│   │   └── models/
│   │       ├── EDSR_x4.pb        # bundled but not currently loaded
│   │       └── FSRCNN_x4.pb      # used for 4x super resolution
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main React application
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── assets/                # hero image, icons
│   ├── public/                   # Static assets and sample images
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── Test_images/                  # Sample images for testing
├── utils/
│   └── image_utils.py            # currently unused placeholder
└── README.md
```

---

## 🛠️ Local Development

### Prerequisites
- Node.js ≥ 18
- Python 3.10
- pip

### 1. Clone the repository

```bash
git clone https://github.com/Riticaa/AI-IMAGE-ENHANCEMENT-SUITE.git
cd AI-IMAGE-ENHANCEMENT-SUITE
```

### 2. Run the Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://127.0.0.1:8000`.

> On Linux, OpenCV needs `ffmpeg` and `libgl1` installed at the system level (already handled for you in the Docker deployment). If you hit an OpenCV import error locally, install these via your package manager first.

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

The frontend is currently configured to call the backend at `http://127.0.0.1:8000` (hardcoded in `App.jsx`), so make sure the backend from step 2 is running first.

---

## 🔌 API Endpoints

All endpoints accept a `multipart/form-data` POST request with a single `file` field (the image).

| Method | Endpoint | Description | Returns |
|---|---|---|---|
| POST | `/denoise/` | Denoise the image | JPEG |
| POST | `/brightness/` | Auto brightness & contrast | JPEG |
| POST | `/super-resolution/` | 4× upscale | JPEG |
| POST | `/sharpen/` | Sharpen details | JPEG |
| POST | `/enhance-all/` | Full enhancement pipeline | JPEG |
| POST | `/background-remove/` | Remove background | PNG |
| POST | `/hdr-filter/` | Apply HDR effect | JPEG |
| POST | `/face-enhance/` | Detect & enhance faces | JPEG |

---

## 📸 Sample Images

The `Test_images/` folder includes several sample photographs you can use to test each enhancement feature locally.

---

## 👩‍💻 Author

Built by **[Riticaa](https://github.com/Riticaa)** — Pixora

---

## 📄 License

This project is open source.
