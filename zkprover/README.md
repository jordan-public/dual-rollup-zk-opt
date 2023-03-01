# How to run the Cartesi ZK Validity Prover

First shell:

```shell
cd zkprover
docker compose -f ./docker-compose.yml -f ./docker-compose.override.yml -f ./docker-compose-host.yml up
```

Second shell:

```shell
cd zkprover
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004" python3 zkprover.py
```

Third shell:

```
cd zkprover/frontend-console
yarn
yarn build

yarn start input send --payload "zkclaim"
yarn start notice list
```