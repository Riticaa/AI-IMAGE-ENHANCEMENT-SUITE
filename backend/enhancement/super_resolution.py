import cv2

print("Loading model...")

sr = cv2.dnn_superres.DnnSuperResImpl_create()

sr.readModel("backend/enhancement/models/FSRCNN_x4.pb")

sr.setModel("fsrcnn", 4)

print("Model loaded successfully!")

def enhance_resolution(image):
    print("Enhancement started")
    print(image.shape)
    output = sr.upsample(image)

    print("Enhancement completed")

    return output