import cv2

sr = cv2.dnn_superres.DnnSuperResImpl_create()

sr.readModel("backend/enhancement/models/EDSR_x4.pb")
sr.setModel("edsr", 4)

def enhance_resolution(image):
    output = sr.upsample(image)
    return output