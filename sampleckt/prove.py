#!/home/gitpod/.pyenv/shims/python3
import subprocess
output = subprocess.getoutput("nargo prove")
output = output.split("\n",2)[1]
print(output)
