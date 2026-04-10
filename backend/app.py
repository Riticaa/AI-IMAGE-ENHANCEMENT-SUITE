from enhancement.super_resolution import enhance_resolution
@app.post("/super-resolution/")
async def super_resolution(file: UploadFile = File(...)):
    contents = await file.read()
    np_arr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    output = enhance_resolution(image)

    output = np.array(output)
    _, img_encoded = cv2.imencode('.jpg', output)

    return {"image": img_encoded.tobytes()}