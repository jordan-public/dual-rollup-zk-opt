const { setup_generic_prover_and_verifier, create_proof } = require("@noir-lang/barretenberg/dest/client_proofs");
const { compile } = require("@noir-lang/noir_wasm");
const path = require("path");


async function run() {
    const compiled_program = compile(path.resolve(__dirname, "../sampleckt/src/main.nr"));
    acir = compiled_program.circuit;
    abi = compiled_program.abi;
    const [prover,] = await setup_generic_prover_and_verifier(acir);

    abi.x = 42;
    const proof = await create_proof(prover, acir, abi);
    console.log(proof);
}

run();