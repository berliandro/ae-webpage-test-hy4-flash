from pathlib import Path
from PIL import Image
root = Path(r'D:\! Coding\~ shit projects\experiment\hy4 flash ae webpage')
cards = ['card-10','card-jack','card-queen','card-king','card-ace']
for i, name in enumerate(cards, 1):
    im = Image.open(root/'assets/hero/cards'/f'{name}.png').convert('RGBA')
    w,h = im.size
    a = im.getchannel('A')
    px = a.load()
    rows = sorted(set([0,5,10,20,30,40,50,60,70,80,90,95,99] + list(range(0,100,10))))
    left=[]; right=[]
    for pct in rows:
        y = min(h-1, int(h*pct/100))
        xs = [x for x in range(w) if px[x,y] > 64]
        if not xs:
            xs=[w//2]
        left.append((min(xs)/w*100, pct))
        right.append((max(xs)/w*100, pct))
    pts = [f'{x:.2f}% {y}%' for x,y in left] + [f'{x:.2f}% {y}%' for x,y in reversed(right)]
    print(f'/* card {i}: {name} */')
    print(f'.card:nth-child({i}) {{ clip-path: polygon({", ".join(pts)}); }}')
