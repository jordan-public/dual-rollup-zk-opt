import { setup_generic_prover_and_verifier, create_proof } from '@noir-lang/barretenberg/dest/client_proofs';
import { compile } from '@noir-lang/noir_wasm';
import path from "path";


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