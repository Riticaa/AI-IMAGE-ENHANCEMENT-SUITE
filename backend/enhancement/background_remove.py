from rembg import remove
import cv2
import numpy as np

def remove_background(image):
    _, buffer = cv2.imencode(".png", image)

    output = remove(buffer.tobytes())

    nparr = np.frombuffer(output, np.uint8)

    return cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)
