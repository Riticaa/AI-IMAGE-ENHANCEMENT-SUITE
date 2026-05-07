import cv2

def adjust_brightness_contrast(image, alpha=1.2, beta=30):
    return cv2.convertScaleAbs(image, alpha=alpha, beta=beta)