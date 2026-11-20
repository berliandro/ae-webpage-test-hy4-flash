from pathlib import Path
root = Path.cwd()

# ---------- script.js ----------
p = root/'script.js'
t = p.read_text(encoding='utf-8')
t = t.replace('  const announce = document.querySelector("#detailAnnounce");\n', '')
# hero entries use stable slug + label from the dataset
t = t.replace('const src = "assets/dossier/heroes/" + h.name.toLowerCase() + ".webp";',
              'const src = "assets/dossier/heroes/" + h.slug + ".webp";')
t = t.replace('\'<span class="hero-entry__name">\' + h.name + \'</span>\'',
              '\'<span class="hero-entry__name">\' + h.label + \'</span>\'')
# rank / suit in the eyebrow
t = t.replace('  function render(card) {',
              '  function announcePlayer(card) {\n'
              '    const p = dataset.find(function (x) { return x.name === card.dataset.name; });\n'
              '    if (!p || !fields.announce) return;\n'
              '    fields.announce.textContent = p.name + ", " + p.role + ". " + fmt(p.avg.kda)\n'
              '      + " average KDA, " + p.avg.kp + " percent kill participation across "\n'
              '      + p.games + " games. " + p.heroes + " distinct heroes.";\n'
              '  }\n\n  function render(card) {')
t = t.replace('    fields.designation.textContent = d.name === "Nino" ? "Captain" : "";',
              '    fields.designation.textContent = d.name === "Nino" ? "Captain" : "";\n'
              '    if (p) fields.eyebrow.textContent = p.rank + p.suit + " · THE READ · MPL ID S18";')
t = t.replace('    fields.mvp.innerHTML = \'<span>MVP points</span>\'\n'
              '        + (mvp ? \'<strong>\' + p.mvp.points + \'</strong><span class="rank">#\' + p.mvp.rank + \' league standing</span>\'\n'
              '              : \'<span class="unavailable">Not published</span>\');',
              '    fields.mvp.innerHTML = mvp\n'
              '        ? \'<span>MVP points</span><strong>\' + p.mvp.points + \'</strong><span class="rank">#\' + p.mvp.rank + \' league standing</span>\'\n'
              '        : \'\';')
t = t.replace("      fields.source.innerHTML = 'Season 18 data: <a href=\"https://id-mpl.com/id/statistics\" target=\"_blank\" rel=\"noopener noreferrer\">MPL Indonesia statistics</a>, retrieved '\n"
              "        + (window.AE_S18.retrieved || '') + '. Individual GPM and MVP award counts are not published and are omitted.';",
              "      fields.source.innerHTML = 'Season 18 data: <a href=\"https://id-mpl.com/id/statistics\" target=\"_blank\" rel=\"noopener noreferrer\">MPL Indonesia statistics</a>, retrieved '\n"
              "        + (window.AE_S18.retrieved || '') + '. Individual GPM and MVP award counts are not published. MVP points appear only when published in the official standings.';")
t = t.replace('      fields.announce.textContent = d.name + ", " + d.role + ". " + fmt(p.avg.kda) + " average KDA, "\n'
              '        + p.avg.kp + " percent kill participation across " + p.games + " games. " + p.heroes + " distinct heroes.";\n', '')
# focusables derived from dialog so the source link is reachable
t = t.replace('    const summary = fields.more && fields.more.querySelector("summary");\n'
              '    return [detailPrev, detailNext, detailClose, summary].filter(Boolean);',
              '    return Array.from(detail.querySelectorAll(\'a[href], button, summary\'))\n'
              '      .filter(function (el) { return el !== fields.name; });')
# announce after the dialog is visible
t = t.replace('      detail.classList.add("is-ready");\n      fields.name.focus();',
              '      detail.classList.add("is-ready");\n      announcePlayer(active);\n      fields.name.focus();')
# stepping changes the card the user last inspected; return focus there
t = t.replace('      render(next);\n      setActive(next);',
              '      render(next);\n      origin = next;\n      setActive(next);')
# stale pointer rAF guard
t = t.replace('    if (!lastPointer || active) return;\n      setActive(cardAt(lastPointer.x, lastPointer.y));',
              '    if (!lastPointer || active || !fan.matches(":hover")) return;\n      setActive(cardAt(lastPointer.x, lastPointer.y));')
t = t.replace('  fan.addEventListener("pointerleave", function () {\n    if (!active) setActive(null);\n  });',
              '  fan.addEventListener("pointerleave", function () {\n    lastPointer = null;\n    if (!active) setActive(null);\n  });')
# Firefox document-relative quads: match client coordinates to document space
t = t.replace('      const dx = x - p1.x, dy = y - p1.y;',
              '      const dx = x + window.scrollX - p1.x, dy = y + window.scrollY - p1.y;')
p.write_text(t, encoding='utf-8')

# ---------- index.html ----------
p = root/'index.html'
t = p.read_text(encoding='utf-8')
t = t.replace('<p class="dossier__eyebrow">MPL ID Season 18 · Player dossier</p>',
              '<p class="dossier__eyebrow" id="dossierEyebrow">THE READ · MPL ID S18</p>')
t = t.replace('<button class="detail__nav-btn" id="detailNext" type="button" aria-label="Next player">&#8594;</button>',
              '<span class="detail__counter" id="detailCounter" aria-hidden="true">01 / 05</span>\n'
              '      <button class="detail__nav-btn" id="detailNext" type="button" aria-label="Next player">&#8594;</button>')
p.write_text(t, encoding='utf-8')

# ---------- data corrections ----------
p = root/'data/s18.js'
t = p.read_text(encoding='utf-8')
t = t.replace('"born": "30 April 2005"', '"born": "30 April 2004"', 1)
t = t.replace('"Null means not published / not in the published top standings, not zero."',
              '"Absent MVP data means not published in the official standings, not zero. No GPM key is present because individual GPM is not published."')
p.write_text(t, encoding='utf-8')
print('source fixes applied')
