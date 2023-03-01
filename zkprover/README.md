# Demo: How to run the Cartesi ZK Validity Prover

Open the demo environment in GitPod:
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#/https://github.com/jordan-public/dual-rollup-zk-opt/)

Open 3 ssh connections into the GitPod demo as follows:

First shell - Hardhat Ethereum node, Cartesi Rollups:

```shell
cd zkprover
docker compose -f ./docker-compose.yml -f ./docker-compose.override.yml -f ./docker-compose-host.yml up
```

Second shell - Cartesi Machine in Host mode:

```shell
cd zkprover
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004" python3 zkprover.py
```

Third shell - front-end:

```
yarn
npx hardhat compile
cd zkprover/frontend-console
yarn
yarn build

# Initiate L2 -> L1 claimi
yarn start input send --payload "zkclaim"

# See proof (as part of claim)
yarn start notice list

# Deploy verification contract and call it to check the proof on Ethereum (Hardhat)
yarn start notice list > out && npx hardhat verify
```