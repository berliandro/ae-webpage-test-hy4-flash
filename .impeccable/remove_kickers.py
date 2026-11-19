from pathlib import Path
root = Path(r'D:\! Coding\~ shit projects\experiment\hy4 flash ae webpage')
for f in ['roster.html','competition.html','legacy.html','media.html','index.html']:
    p = root / f
    lines = p.read_text(encoding='utf-8').splitlines(keepends=True)
    out = [ln for ln in lines if 'class="page-kicker"' not in ln]
    p.write_text(''.join(out), encoding='utf-8')
    print(f, 'kicker lines removed:', len(lines) - len(out))
