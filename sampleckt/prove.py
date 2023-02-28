#!python3
import subprocess
output = subprocess.getoutput("nargo prove theProof")
print(output)
