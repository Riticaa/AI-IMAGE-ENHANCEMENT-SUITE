import cv2
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "models", "FSRCNN_x4.pb")
)

print("MODEL PATH:", MODEL_PATH)
print("MODEL EXISTS:", os.path.exists(MODEL_PATH))
sr = None

def get_model():
    
    global sr

    if sr is None:
        print("Loading Super Resolution model...")

        try:
            sr = cv2.dnn_superres.DnnSuperResImpl_create()
            sr.readModel(MODEL_PATH)
            sr.setModel("fsrcnn", 4)
            print("Model loaded successfully!")
        except Exception as e:
            print("ERROR:", e)
            raise


def enhance_resolution(image):
    model = get_model()
    return model.upsample(image)