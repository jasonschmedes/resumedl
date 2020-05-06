import os, json
from pathlib import Path
cwd = os.environ['REMOTEDL_LS_DIR']
reverse = os.getenv('REMOTEDL_LS_DIRECTION') == 'desc'
key = lambda x: x.name
if os.getenv('REMOTEDL_LS_SORT') == 'mtime':
    key = os.path.getmtime
files = filter(lambda x: not x.name.startswith('.'), Path(cwd).iterdir())
print(json.dumps([file.as_posix() for file in sorted(files, key=key, reverse=reverse)]))
