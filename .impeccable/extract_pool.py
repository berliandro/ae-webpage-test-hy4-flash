from pathlib import Path
import re, html
t = Path(r'C:\Users\nberl\AppData\Local\Temp\mpl-stats.html').read_text(encoding='utf-8', errors='ignore')
start = t.find('<table id="table-hero-pools"')
end = t.find('</table>', start)
section = t[start:end]
rows = re.findall(r'<tr class="col-hero-pools[\s\S]*?</tr>', section)
targets = {'NINO','AFFAN','DALVIN','DINGARAI','ALEXANDER'}
for row in rows:
    m = re.search(r'<div class="player-name[^"]*">\s*<b>([^<]+)</b>', row)
    if not m: continue
    name = html.unescape(m.group(1)).strip()
    if name.upper() not in targets: continue
    lane = re.search(r'<td>\s*([A-Z]+)\s*</td>', row)
    total = re.search(r'<td>\s*(\d+)\s*</td>', row)
    heroes = []
    for h in re.findall(r'<img src="[^"]*/mlbb/heroes/([^"/?]+)\.[^"]*"[^>]*>[\s\S]*?<div class="hero-pool-pick[^"]*">\s*(\d+)\s*</div>[\s\S]*?<div class="hero-pool-count[^"]*">\s*(\d+)%\s*</div>', row):
        heroes.append((h[0], int(h[1]), int(h[2])))
    print(name, 'lane', lane.group(1) if lane else '?', 'total', total.group(1) if total else '?')
    for h in heroes[:8]: print('  ',h)
