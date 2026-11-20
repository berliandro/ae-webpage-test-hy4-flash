from pathlib import Path
import re, html
p = Path(r'C:\Users\nberl\AppData\Local\Temp\mpl-stats.html')
t = p.read_text(encoding='utf-8', errors='ignore')
for name in ['AE - Nino','AE - Yazukee','AE - Dalvin','AE - Arfy','AE - Alexander','AE - Dingarai','AE - Affan']:
    print('===',name,'occurrences',t.count(name))
    for m in list(re.finditer(re.escape(name), t))[:3]:
        chunk = t[max(0,m.start()-4000):m.start()+2000]
        imgs = re.findall(r'<img[^>]+(?:alt|title)="([^"]+)"', chunk, flags=re.I)
        print(' imgs:', html.unescape(' | '.join(imgs[-14:]))[:500])
