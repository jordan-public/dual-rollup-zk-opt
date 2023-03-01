import { compile } from '@noir-lang/noir_wasm';
import { setup_generic_prover_and_verifier, create_proof } from '@noir-lang/barretenberg/dest/client_proofs';
const path = require("path");

export default async function prove() {
    const compiled_program = compile(path.resolve(__dirname, "../sampleckt/src/main.nr"));
    const acir = compiled_program.circuit;
    let abi = compiled_program.abi;
    const [prover,] = await setup_generic_prover_and_verifier(acir);

    abi.x = 42;
    const proof = await create_proof(prover, acir, abi);
    console.log(proof.toString('hex'));
}