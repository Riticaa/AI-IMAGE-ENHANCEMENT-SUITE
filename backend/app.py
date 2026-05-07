from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
import numpy as np
import cv2
import io

from backend.enhancement.denoising import denoise_image
from backend.enhancement.color_correction import adjust_brightness_contrast
from backend.enhancement.super_resolution import enhance_resolution

app = FastAPI()


@app.get("/")
def home():
    return {"message": "AI Image Enhancement Suite Backend Running"}


@app.post("/denoise/")
async def denoise(file: UploadFile = File(...)):
    contents = await file.read()

    np_arr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    output = denoise_image(image)

    _, encoded_img = cv2.imencode(".jpg", output)

    return StreamingResponse(
        io.BytesIO(encoded_img.tobytes()),
        media_type="image/jpeg"
    )


@app.post("/brightness/")
async def brightness(file: UploadFile = File(...)):
    contents = await file.read()

    np_arr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    output = adjust_brightness_contrast(image)

    _, encoded_img = cv2.imencode(".jpg", output)

    return StreamingResponse(
        io.BytesIO(encoded_img.tobytes()),
        media_type="image/jpeg"
    )


@app.post("/super-resolution/")
async def super_resolution(file: UploadFile = File(...)):
    contents = await file.read()

    np_arr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    output = enhance_resolution(image)

    _, encoded_img = cv2.imencode(".jpg", output)

    return StreamingResponse(
        io.BytesIO(encoded_img.tobytes()),
        media_type="image/jpeg"
    )