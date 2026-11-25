from PIL import Image
from pathlib import Path
image = Image.open(r'C:\Users\sarth\OneDrive\Desktop\mamaji.jpeg').convert('RGB')
print(image.size)
out = Path('public/images')
image.crop((180, 68, 433, 405)).resize((506, 674), Image.Resampling.LANCZOS).save(out / 'mama-portrait.webp', quality=94)
for name, bounds in [('rajma', (572, 557, 783, 757)), ('kadhi', (571, 777, 779, 979)), ('chole', (575, 998, 783, 1202))]:
    image.crop(bounds).resize((624, 606), Image.Resampling.LANCZOS).save(out / f'{name}-chawal.webp', quality=95)
