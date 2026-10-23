from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json
import argparse

parser = argparse.ArgumentParser(description='Prepare stable web photo assets without recompressing existing files.')
parser.add_argument('--refresh', action='store_true', help='Regenerate existing images as well as new ones.')
args = parser.parse_args()

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / '朋友圈'
DEST = ROOT / 'assets'
DEST.mkdir(exist_ok=True)
records = []
manifest = ROOT / 'asset-manifest.json'
previous = json.loads(manifest.read_text(encoding='utf-8')) if manifest.exists() else []
existing_ids = {(item['group'], item['original']): item['id'] for item in previous}
groups = [('cover', ''), ('nanjing', '南京'), ('henan', '河南'), ('birthday', '生日'), ('life', '生活'), ('portrait', '写真')]
for key, folder in groups:
    directory = SOURCE / folder
    files = [SOURCE / '封面.jpg'] if not folder else sorted(path for path in directory.iterdir() if path.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp'}) if directory.exists() else []
    next_number = max([int(item['id'].split('-')[-1]) for item in previous if item['group'] == key], default=0) + 1
    for path in files:
        photo_id = existing_ids.get((key, path.name))
        if photo_id is None:
            photo_id = f'{key}-{next_number:02}'
            next_number += 1
        image = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
        original_size = image.size
        name = f'{photo_id}.jpg'
        if args.refresh or not (DEST / name).exists() or not (DEST / f'{photo_id}-thumb.jpg').exists():
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            image.save(DEST / name, quality=89, optimize=True)
            thumb = image.copy()
            thumb.thumbnail((360, 420), Image.Resampling.LANCZOS)
            thumb.save(DEST / f'{photo_id}-thumb.jpg', quality=78, optimize=True)
        records.append({'id':photo_id, 'group':key, 'file':name, 'original':path.name, 'width':original_size[0], 'height':original_size[1]})

sheet = Image.new('RGB', (1250, ((len(records)+4)//5)*290), '#eee9df')
draw = ImageDraw.Draw(sheet)
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 18)
for i, record in enumerate(records):
    image = Image.open(DEST / record['file'])
    image = ImageOps.contain(image, (234, 244))
    x, y = (i%5)*250, (i//5)*290
    sheet.paste(image, (x+(250-image.width)//2,y))
    draw.text((x+10,y+252), f"{record['id']}  {record['width']}x{record['height']}", fill='#24221e', font=font)
sheet.save(ROOT / 'contact-sheet.jpg', quality=90)
(ROOT / 'asset-manifest.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Prepared {len(records)} photographs. Contact sheet: {ROOT / "contact-sheet.jpg"}')
