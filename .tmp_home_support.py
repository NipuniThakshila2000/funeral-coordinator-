from pathlib import Path

path = Path("app/page.tsx")
text = path.read_text()
marker = "    {\n      label: \"Email the team\",\n      value: \"help@funeralcoordinator.lk\",\n      href: \"mailto:help@funeralcoordinator.lk\",\n    },\n  ];"
if marker not in text:
    raise SystemExit("Support channels tail not found")
addition = "    {\n      label: \"Impact pledge\",\n      value: \"Packages uplift widows' cooperatives & grief counselling\",\n      href: \"/csr\",\n    },\n"
text = text.replace(marker, addition + marker, 1)
path.write_text(text)
