from pathlib import Path
from PIL import Image
from io import BytesIO
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor
import re, html, json

root = Path.cwd()
t = Path(r'C:\Users\nberl\AppData\Local\Temp\mpl-stats.html').read_text(encoding='utf-8', errors='ignore')
start = t.find('<table id="table-hero-pools"')
section = t[start:t.find('</table>', start)]
pools = {}
for row in re.findall(r'<tr class="col-hero-pools[\s\S]*?</tr>', section):
    m = re.search(r'<div class="player-name[^"]*">\s*<b>([^<]+)</b>', row)
    if not m: continue
    name = html.unescape(m.group(1)).strip()
    heroes = []
    for src, picks, win in re.findall(
        r'<img src="([^"]*/mlbb/heroes/[^"]+)"[^>]*>[\s\S]*?'
        r'<div class="hero-pool-pick[^"]*">\s*(\d+)\s*</div>[\s\S]*?'
        r'<div class="hero-pool-count[^"]*">\s*(\d+)%\s*</div>', row):
        raw = re.search(r'/heroes/([^"/?]+)\.(?:jpg|webp|png)', src).group(1)
        label = raw.replace('_', ' ').replace('-', ' ')
        label = ' '.join(w.capitalize() for w in label.split())
        slug = re.sub(r'[^a-z0-9]+', '-', raw.lower()).strip('-')
        heroes.append({'slug': slug, 'label': label, 'picks': int(picks), 'winRate': int(win), 'src': src})
    pools[name.upper()] = heroes

data = json.loads((root/'data/s18.js').read_text(encoding='utf-8').split('=',1)[1].strip().rstrip(';'))
ranks = {'nino':('A','♠'),'affan':('J','♣'),'dalvin':('Q','♥'),'dingarai':('10','♣'),'alexander':('K','♦')}
for p in data['players']:
    pool = pools.get(p['name'].upper(), [])
    pool.sort(key=lambda h: (-h['picks'], -h['winRate']))
    p['pool'] = [{k:v for k,v in h.items() if k!='src'} for h in pool]
    p['heroes'] = len(pool)
    p['rank'], p['suit'] = ranks[p['id']]

out_dir = root/'assets/dossier/heroes'
for f in out_dir.glob('*.webp'): f.unlink()
allheroes = {}
for p in data['players']:
    for h in pools.get(p['name'].upper(), []):
        allheroes[h['slug']] = h['src']

arena = Image.open(root/'assets/poker-arena/background.png').convert('RGB')
pal = arena.quantize(colors=40, method=Image.Quantize.MEDIANCUT).convert('RGB')
colors = sorted(set(pal.getdata()))
colors += [(215,186,142),(200,168,129),(174,147,116),(160,112,81),(132,66,55),(87,45,49),(57,39,42),(19,16,23)]
colors = list(dict.fromkeys(colors))[:64]
palimg = Image.new('P',(256,1)); flat=[]
for c in colors: flat.extend(c)
flat += [0]*(768-len(flat)); palimg.putpalette(flat)

def make(item):
    slug, url = item
    try:
        raw = urlopen(Request(url, headers={'User-Agent':'Mozilla/5.0'}), timeout=20).read()
        im = Image.open(BytesIO(raw)).convert('RGB')
        side = min(im.size)
        im = im.crop(((im.width-side)//2, 0, (im.width+side)//2, side)).resize((80,80), Image.Resampling.LANCZOS)
        q = im.quantize(palette=palimg, dither=Image.Dither.FLOYDSTEINBERG).convert('RGB')
        q.resize((160,160), Image.Resampling.NEAREST).save(out_dir/f'{slug}.webp','WEBP',lossless=True,method=6)
        return None
    except Exception as e:
        return f'{slug}: {e}'

with ThreadPoolExecutor(max_workers=4) as ex:
    errs = [e for e in ex.map(make, allheroes.items()) if e]
print('heroes', len(allheroes), 'errors', errs[:5])
(root/'data/s18.js').write_text('window.AE_S18 = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
