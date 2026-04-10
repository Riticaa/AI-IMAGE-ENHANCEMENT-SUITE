from realesrgan import RealESRGAN
import torch
from PIL import Image

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model = RealESRGAN(device, scale=4)
model.load_weights('weights/RealESRGAN_x4.pth')

def enhance_resolution(image):
    image = Image.fromarray(image)
    sr_image = model.predict(image)
    return sr_image