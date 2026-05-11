from gfpgan import GFPGANer
import cv2
import os

model_path = "backend/enhancement/weights/GFPGANv1.4.pth"

restorer = GFPGANer(
    model_path=model_path,
    upscale=2,
    arch="clean",
    channel_multiplier=2,
    bg_upsampler=None
)

def enhance_face(image):
    _, _, output = restorer.enhance(
        image,
        has_aligned=False,
        only_center_face=False,
        paste_back=True
    )

    return output