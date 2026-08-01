import cv2
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "models", "FSRCNN_x4.pb")

print("MODEL PATH:", MODEL_PATH)
print("MODEL EXISTS:", os.path.exists(MODEL_PATH))

sr = None


def get_model():
    global sr

    if sr is None:
        print("Loading Super Resolution model...")

        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"Model not found: {MODEL_PATH}"
            )

        sr = cv2.dnn_superres.DnnSuperResImpl_create()
        sr.readModel(MODEL_PATH)
        sr.setModel("fsrcnn", 4)

        print("Model loaded successfully!")

    return sr


def enhance_resolution(image):
    model = get_model()

    output = model.upsample(image)

    return output