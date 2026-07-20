import cv2
import os

print("Loading model...")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "FSRCNN_x4.pb")

sr = cv2.dnn_superres.DnnSuperResImpl_create()

sr.readModel(MODEL_PATH)

sr.setModel("fsrcnn", 4)

print("Model loaded successfully!")

def enhance_resolution(image):
    output = sr.upsample(image)
    return output
