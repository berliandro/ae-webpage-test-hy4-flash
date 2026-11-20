from pathlib import Path
import re
f = Path(r'C:\Users\nberl\.local\share\opencode\tool-output\tool_1f65a03fe001MKSs6F6Ue5L8SV')
lines = [l.strip() for l in f.read_text(encoding='utf-8', errors='ignore').splitlines()]
for name in ['Nino','Affan','Dalvin','Dingarai','Alexander','Yazukee','Arfy']:
    idxs=[i for i,l in enumerate(lines) if l==name]
    # prefer player-table occurrences followed by lane
    for i in idxs[:3]:
        chunk=lines[i+1:i+30]
        nums=[x for x in chunk if x and re.fullmatch(r'\d+|\d+,\d+%?', x)]
        print(name, 'line',i, nums[:12])
