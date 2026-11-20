from pathlib import Path
import re
root = Path.cwd()

p = root/'dossier.css'
t = p.read_text(encoding='utf-8')
t = t.replace('''/* The name is focused programmatically, not a keyboard stop; its browser
   focus ring is the unwanted white rectangle around the heading. */
.dossier__name:focus,
.dossier__name:focus-visible { outline: none; }''',
'''/* A designed cue replaces the browser's white focus rectangle. The heading
   is focused programmatically, so :focus (not :focus-visible) is required. */
.dossier__name:focus { outline: none; text-decoration: underline solid var(--amber) 2px; text-underline-offset: 6px; }''')
t = t.replace('letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.dossier__name',
              'letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.dossier__name')
t = t.replace('letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.dossier__designation:empty',
              'letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.dossier__designation:empty')
t = t.replace('font-size: 0.68rem;\n  letter-spacing: 0.1em;', 'font-size: 0.75rem;\n  letter-spacing: 0.06em;')
t = t.replace('font-size: 0.72rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.dossier__pool',
              'font-size: 0.72rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.dossier__pool')
t = t.replace('font-size: 0.78rem; line-height: 1.1;', 'font-size: 0.82rem; line-height: 1.1;')
t = t.replace('color: rgba(231,214,180,0.74); font-size: 0.7rem;', 'color: rgba(231,214,180,0.88); font-size: 0.76rem;')
t = t.replace('font-size: 0.7rem;\n  line-height: 1.5;\n  max-width: 60ch;', 'font-size: 0.72rem;\n  line-height: 1.6;\n  max-width: 60ch;')
t = t.replace('color: rgba(231,214,180,0.58);\n  font-size: 0.72rem;', 'color: rgba(231,214,180,0.82);\n  font-size: 0.72rem;')
t = t.replace('''  font-size: 0.92rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;''',
'''  font-size: 0.92rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;''')
t = t.replace('  white-space: nowrap;\n  overflow: hidden; text-overflow: ellipsis;\n}',
              '  white-space: nowrap;\n  overflow: hidden; text-overflow: ellipsis;\n}')
t = t.replace('.dossier__heroes--all { max-height: 260px;', '.dossier__mvp:empty { display: none; }\n.dossier__heroes--all { max-height: 260px;')
t = t.replace('.detail.is-ready .dossier > *:nth-child(6) { transition-delay: 200ms; }',
              '.detail.is-ready .dossier > *:nth-child(6) { transition-delay: 200ms; }\n'
              '.detail.is-ready .dossier > *:nth-child(7) { transition-delay: 240ms; }\n'
              '.detail.is-ready .dossier > *:nth-child(8) { transition-delay: 280ms; }')
t = t.replace('.dossier { color: #f1e4cd; text-wrap: pretty; min-width: 0; }',
              '.dossier {\n  color: #f1e4cd; text-wrap: pretty; min-width: 0;\n'
              '  padding: 1rem; margin: -1rem;\n'
              '  background: radial-gradient(ellipse at 50% 45%, rgba(10,8,12,0.55), transparent 75%);\n}')
t = t.replace('''  .hero-entry img { width: 36px; height: 36px; }
  .dossier__heroes--all { max-height: 210px; }''',
'''  .hero-entry img { width: 36px; height: 36px; }
  .dossier__heroes--all { max-height: 210px; }
  .dossier__line { align-items: flex-start; }
  .dossier__line strong { font-size: 0.85rem; text-align: right; }''')
t += '''\n@media (max-width: 400px) {
  .dossier__heroes { grid-template-columns: 1fr; }
  .metric__label { min-height: 2.4em; }
  .hero-entry__meta { overflow: hidden; text-overflow: ellipsis; }
}
.detail__counter {
  align-self: center;
  color: rgba(231,214,180,0.72);
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
}
'''
p.write_text(t, encoding='utf-8')

# styles.css: remove dead legacy detail selectors, keep the live ones
p = root/'styles.css'
t = p.read_text(encoding='utf-8')
dead = ['.detail__eyebrow','.detail__name','.detail__role','.detail__lane-icon','.detail__facts','.detail__fact','.detail__card']
pattern = re.compile(r'(?<![-\w])' + '(?:' + '|'.join(re.escape(d) for d in dead) + r')[\s\S]*?\{[^}]*\}')
t2 = pattern.sub('', t)
p.write_text(t2, encoding='utf-8')
print('css fixes applied; removed', len(pattern.findall(t)), 'dead blocks')
