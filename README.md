# Pixora — AI Image Enhancement Suite

> **Pixora** is a multi-functional AI-powered image enhancement web application that lets you upload photos and apply intelligent enhancements — all through a clean, modern browser interface.

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

| Technology | What it does here |
|---|---|
| **React 19** | The core UI library. Renders the entire single-page app and manages component state (selected image, loading status, active menu, etc.) using hooks like `useState` and `useEffect`. |
| **Vite** | The build tool and dev server. Gives near-instant hot-reload during development and bundles the app into optimized static assets for production. |
| **Tailwind CSS** | A utility-first CSS framework used for all styling — layout, spacing, colors, and responsiveness — without writing custom CSS files. |
| **Framer Motion** | Powers the UI animations and transitions (fade-ins, hover effects, menu open/close, etc.) for a smoother, more polished feel. |
| **react-compare-image** | Renders the interactive before/after slider so users can drag to compare the original and enhanced image. |
| **react-dropzone** | Handles drag-and-drop and click-to-upload image selection with file-type validation. |
| **react-fast-marquee** | Drives the scrolling marquee/ticker UI element (e.g., feature highlights or testimonials). |
| **react-icons** | Provides the icon set used across buttons and menus (upload, download, magic wand, sun, etc.). |
| **Axios** | Handles HTTP requests from the frontend to the FastAPI backend — sending the uploaded image and receiving back the processed image as binary data. |

### Backend

| Technology | What it does here |
|---|---|
| **FastAPI** | The Python web framework that exposes each enhancement as a REST endpoint (`/denoise/`, `/sharpen/`, etc.), handles file uploads, and returns processed images as responses. |
| **Uvicorn** | The ASGI server that actually runs the FastAPI app and serves incoming HTTP requests. |
| **OpenCV** (`opencv-contrib-python-headless`) | The core image-processing engine — used for denoising, brightness/contrast correction, sharpening, HDR tone-mapping, face detection (Haar Cascade), and DNN-based super resolution. The "headless" + "contrib" build is used because the server has no display and needs the extra `dnn_superres` module. |
| **NumPy** | Used to convert uploaded image bytes into arrays that OpenCV can process, and back again. |
| **SciPy** / **scikit-image** | Supplementary image/array processing utilities used inside the enhancement pipelines. |
| **Pillow (PIL)** | Additional image format handling/conversion support. |
| **rembg** (built on **ONNX Runtime**) | Runs a pretrained deep-learning segmentation model to cleanly remove image backgrounds. |
| **python-multipart** | Required by FastAPI to parse the `multipart/form-data` image uploads coming from the frontend. |

> **Note:** Face enhancement and super resolution currently run on classical OpenCV/DNN pipelines rather than GFPGAN or Real-ESRGAN — there's no PyTorch dependency in `requirements.txt`. An `EDSR_x4.pb` model ships in `backend/enhancement/models/` alongside `FSRCNN_x4.pb`, but only FSRCNN is currently wired up in `super_resolution.py`.

---

## 📁 Project Structure

```
Pixora/
├── backend/
│   ├── app.py                    # FastAPI app with all enhancement endpoints
│   ├── requirements.txt          # Python dependencies
│   ├── Dockerfile                # Docker config for backend deployment
│   ├── runtime.txt               # python-3.10.10
│   ├── packages.txt              # ffmpeg, libgl1 (system deps)
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

## 🛠️ Running Locally

### Prerequisites
- Node.js ≥ 18
- Python 3.10
- pip
- On Linux: `ffmpeg` and `libgl1` installed at the system level (OpenCV needs these — already handled for you if you use the Dockerfile)

### 1. Clone the repository

```bash
git clone https://github.com/Riticaa/AI-IMAGE-ENHANCEMENT-SUITE.git
cd AI-IMAGE-ENHANCEMENT-SUITE
```

### 2. Run the backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://127.0.0.1:8000`.

> If you hit an OpenCV import error on Linux, install `ffmpeg` and `libgl1` via your package manager first (e.g., `sudo apt-get install ffmpeg libgl1`).

### 3. Run the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Configuring the API URL

The frontend reads the backend URL from the `VITE_API_URL` environment variable, and falls back to `http://127.0.0.1:8000` if it isn't set:

```js
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
```

For local development, no configuration is needed — the default already matches step 2 above. To point the frontend at a different backend (e.g., a deployed one), create a `.env` file inside `frontend/`:

```
VITE_API_URL=http://127.0.0.1:8000
```

Restart `npm run dev` after adding or changing this file so Vite picks up the new value.

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
<img width="720" height="593" alt="image" src="https://github.com/user-attachments/assets/3f72498f-ddf8-4fcf-87d7-2e72749609e8" />

<img width="764" height="585" alt="image" src="https://github.com/user-attachments/assets/e17245b8-80c6-42cb-bedc-9327a991479d" />


---

## 👩‍💻 Author

Built by **[Riticaa](https://github.com/Riticaa)** — Pixora

---

## 📄 License

This project is open source.
