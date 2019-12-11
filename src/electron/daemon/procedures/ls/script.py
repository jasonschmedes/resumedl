import os, json
cwd = os.environ['REMOTEDL_LS_DIR']
files = filter(lambda x: not x.startswith('.'), os.listdir(cwd))
print(json.dumps([os.path.join(cwd, file) for file in files]))
