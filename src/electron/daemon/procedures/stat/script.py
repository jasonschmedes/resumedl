import os, json
from pathlib import Path
file = os.environ['REMOTEDL_STAT_FILE']
print(json.dumps({ 'size': os.stat(file).st_size }))
