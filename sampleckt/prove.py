#!/home/gitpod/.pyenv/shims/python3
import subprocess
output = subprocess.getoutput("nargo prove")
print(output)
