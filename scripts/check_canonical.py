#!/usr/bin/env python3
from pathlib import Path
import sys

root = Path(__file__).resolve().parent.parent
canonical_root = root / 'CANONICAL.md'

allowed = {
    'README.md', 'CANONICAL.md', 'archive', '.github', 'evaluate.mjs',
    '.gitignore', '.git', 'scripts'
}

violations = []
for child in sorted(root.iterdir()):
    if child.name not in allowed:
        if child.is_dir():
            violations.append(f'directory:{child.name}')
        elif child.is_file():
            violations.append(f'file:{child.name}')

if not canonical_root.exists():
    violations.append('missing:CANONICAL.md')

if violations:
    print('Canonical boundary violation detected:')
    for v in violations:
        print(f' - {v}')
    print('\nOnly the canonical machine may remain in the repo root.')
    sys.exit(1)

print('Canonical boundary OK.')
