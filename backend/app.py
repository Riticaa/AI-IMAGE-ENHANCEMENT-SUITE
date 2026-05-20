from fastapi import FastAPI, File, UploadFile
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware

import cv2
import numpy as np

from enhancement.denoising import denoise_image
from enhancement.color_correction import adjust_brightness_contrast
from enhancement.super_resolution import enhance_resolution
from enhancement.sharpen import sharpen_image
from enhancement.background_remove import remove_background
from enhancement.hdr_filter import hdr_filter
from enhancement.face_enhance import enhance_face

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/denoise/")
async def denoise(file: UploadFile = File(...)):

    contents = await file.read()

    nparr = np.frombuffer(contents, np.uint8)

    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    output = denoise_image(image)

    _, buffer = cv2.imencode(".jpg", output)

    return Response(
        content=buffer.tobytes(),
        media_type="image/jpeg"
    )

@app.post("/brightness/")
async def brightness(file: UploadFile = File(...)):

    contents = await file.read()

    nparr = np.frombuffer(contents, np.uint8)

    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    output = adjust_brightness_contrast(image)
    _, buffer = cv2.imencode(".jpg", output)

    return Response(
        content=buffer.tobytes(),
        media_type="image/jpeg"
    )

@app.post("/super-resolution/")
async def super_resolution(file: UploadFile = File(...)):

    contents = await file.read()

    nparr = np.frombuffer(contents, np.uint8)

    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    output = enhance_resolution(image)

    _, buffer = cv2.imencode(".jpg", output)

    return Response(
        content=buffer.tobytes(),
        media_type="image/jpeg"
    )

@app.post("/sharpen/")
async def sharpen(file: UploadFile = File(...)):

    contents = await file.read()

    nparr = np.frombuffer(contents, np.uint8)

    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    output = sharpen_image(image)

    _, buffer = cv2.imencode(".jpg", output)

    return Response(
        content=buffer.tobytes(),
        media_type="image/jpeg"
    )

@app.post("/enhance-all/")
async def enhance_all(file: UploadFile = File(...)):

    contents = await file.read()

    np_array = np.frombuffer(contents, np.uint8)

    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    image = denoise_image(image)

    image = adjust_brightness_contrast(image)

    image = sharpen_image(image)

    image = enhance_resolution(image)

    _, encoded_img = cv2.imencode(".jpg", image)

    return Response(
        content=encoded_img.tobytes(),
        media_type="image/jpeg"
    )
@app.post("/background-remove/")
async def background_remove(file: UploadFile = File(...)):
    contents = await file.read()

    np_arr = np.frombuffer(contents, np.uint8)

    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    output = remove_background(image)

    _, encoded_img = cv2.imencode(".png", output)

    return Response(
        content=encoded_img.tobytes(),
        media_type="image/png"
    )

@app.post("/hdr-filter/")
async def apply_hdr_filter(file: UploadFile = File(...)):
    contents = await file.read()

    np_arr = np.frombuffer(contents, np.uint8)

    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    output = hdr_filter(image)

    _, encoded_img = cv2.imencode(".jpg", output)

    return Response(
        content=encoded_img.tobytes(),
        media_type="image/jpeg"
    )

@app.post("/face-enhance/")
async def face_enhance(file: UploadFile = File(...)):
    contents = await file.read()

    np_arr = np.frombuffer(contents, np.uint8)

    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    output = enhance_face(image)

    _, encoded_img = cv2.imencode(".jpg", output)

    return Response(
        content=encoded_img.tobytes(),
        media_type="image/jpeg"
    )
