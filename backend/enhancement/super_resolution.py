import cv2
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "FSRCNN_x4.pb")

sr = None

def get_model():
    global sr

    if sr is None:
        print("Loading Super Resolution model...")
        sr = cv2.dnn_superres.DnnSuperResImpl_create()
        sr.readModel(MODEL_PATH)
        sr.setModel("fsrcnn", 4)
        print("Model loaded successfully!")

    return sr


def enhance_resolution(image):
    model = get_model()
    return model.upsample(image)