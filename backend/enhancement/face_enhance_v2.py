import cv2
import numpy as np
from enhancement.super_resolution import enhance_resolution
FACE_CASCADE = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)


def detect_faces(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = FACE_CASCADE.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(60, 60)
    )

    return faces


def expand_face_box(x, y, w, h, image_shape, scale=0.30):
    height, width = image_shape[:2]

    pad_x = int(w * scale)
    pad_y = int(h * scale)

    x1 = max(0, x - pad_x)
    y1 = max(0, y - pad_y)

    x2 = min(width, x + w + pad_x)
    y2 = min(height, y + h + pad_y)

    return x1, y1, x2, y2


def apply_bilateral(img):
    return cv2.bilateralFilter(img, 9, 60, 60)


def apply_clahe(img):
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

    l, a, b = cv2.split(lab)

    clahe = cv2.createCLAHE(
        clipLimit=2.5,
        tileGridSize=(8, 8)
    )

    l = clahe.apply(l)

    merged = cv2.merge((l, a, b))

    return cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)


def auto_white_balance(img):
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

    l, a, b = cv2.split(lab)

    avg_a = np.mean(a)
    avg_b = np.mean(b)

    a = a.astype(np.float32)
    b = b.astype(np.float32)

    a -= (avg_a - 128) * (l / 255.0) * 1.1
    b -= (avg_b - 128) * (l / 255.0) * 1.1

    a = np.clip(a, 0, 255).astype(np.uint8)
    b = np.clip(b, 0, 255).astype(np.uint8)

    merged = cv2.merge((l, a, b))

    return cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)
def adaptive_gamma(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    brightness = np.mean(gray)

    if brightness < 70:
        gamma = 0.75
    elif brightness < 120:
        gamma = 0.90
    elif brightness > 190:
        gamma = 1.15
    else:
        gamma = 1.0

    inv_gamma = 1.0 / gamma

    table = np.array(
        [((i / 255.0) ** inv_gamma) * 255 for i in np.arange(256)],
        dtype=np.uint8,
    )

    return cv2.LUT(img, table)


def adaptive_unsharp(img):
    blur = cv2.GaussianBlur(img, (0, 0), 1.2)

    sharpened = cv2.addWeighted(
        img,
        1.25,
        blur,
        -0.25,
        0
    )

    return np.clip(sharpened, 0, 255).astype(np.uint8)


def smooth_skin(img):
    return cv2.bilateralFilter(
        img,
        d=7,
        sigmaColor=45,
        sigmaSpace=45
    )


def match_color(source, target):
    source_lab = cv2.cvtColor(source, cv2.COLOR_BGR2LAB).astype(np.float32)
    target_lab = cv2.cvtColor(target, cv2.COLOR_BGR2LAB).astype(np.float32)

    for i in range(3):
        s_mean = np.mean(source_lab[:, :, i])
        s_std = np.std(source_lab[:, :, i])

        t_mean = np.mean(target_lab[:, :, i])
        t_std = np.std(target_lab[:, :, i])

        if s_std < 1:
            s_std = 1

        target_lab[:, :, i] = (
            (target_lab[:, :, i] - t_mean)
            * (s_std / max(t_std, 1))
            + s_mean
        )

    target_lab = np.clip(target_lab, 0, 255).astype(np.uint8)

    return cv2.cvtColor(target_lab, cv2.COLOR_LAB2BGR)


def enhance_pipeline(face):
    original_h, original_w = face.shape[:2]

    # Upscale the face first
    upscaled = enhance_resolution(face)

    # Apply enhancement on the higher-resolution face
    enhanced = apply_bilateral(upscaled)
    enhanced = auto_white_balance(enhanced)
    enhanced = adaptive_gamma(enhanced)
    enhanced = apply_clahe(enhanced)
    enhanced = smooth_skin(enhanced)
    enhanced = adaptive_unsharp(enhanced)

    # Resize back to the original face size
    enhanced = cv2.resize(
        enhanced,
        (original_w, original_h),
        interpolation=cv2.INTER_AREA
    )

    enhanced = match_color(face, enhanced)

    return enhanced
def create_feather_mask(width, height):
    mask = np.zeros((height, width), dtype=np.uint8)

    center = (width // 2, height // 2)

    axes = (
        max(1, int(width * 0.42)),
        max(1, int(height * 0.48))
    )

    cv2.ellipse(
        mask,
        center,
        axes,
        0,
        0,
        360,
        255,
        -1
    )

    mask = cv2.GaussianBlur(mask, (51, 51), 0)

    return mask


def seamless_face_blend(original, enhanced, x1, y1, x2, y2):
    roi = original[y1:y2, x1:x2]

    enhanced = cv2.resize(
        enhanced,
        (roi.shape[1], roi.shape[0])
    )

    mask = create_feather_mask(
        roi.shape[1],
        roi.shape[0]
    )

    center = (
        x1 + roi.shape[1] // 2,
        y1 + roi.shape[0] // 2
    )

    try:
        blended = cv2.seamlessClone(
            enhanced,
            original,
            mask,
            center,
            cv2.NORMAL_CLONE
        )

        return blended

    except Exception:
        output = original.copy()

        alpha = mask.astype(np.float32) / 255.0
        alpha = alpha[:, :, np.newaxis]

        blended_roi = (
            enhanced.astype(np.float32) * alpha +
            roi.astype(np.float32) * (1 - alpha)
        )

        output[y1:y2, x1:x2] = blended_roi.astype(np.uint8)

        return output
def enhance_face(image):
    """
    Enhance faces in an image using OpenCV.
    Returns the enhanced image.
    """

    if image is None:
        return image

    output = image.copy()

    faces = detect_faces(image)

    if len(faces) == 0:
        return output

    for (x, y, w, h) in faces:

        x1, y1, x2, y2 = expand_face_box(
            x,
            y,
            w,
            h,
            image.shape,
            scale=0.20
        )

        face_roi = image[y1:y2, x1:x2]

        if face_roi.size == 0:
            continue

        try:
            enhanced_face = enhance_pipeline(face_roi)

            output = seamless_face_blend(
                output,
                enhanced_face,
                x1,
                y1,
                x2,
                y2
            )

        except Exception as e:
            print(f"Face enhancement failed: {e}")
            continue

    return output