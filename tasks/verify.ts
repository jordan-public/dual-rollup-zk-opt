import { readFileSync } from 'fs'

export default async function verify(hre: any) {
    const provider = new hre.ethers.providers.JsonRpcProvider('http://0.0.0.0:8545');
    const [ account ] = await provider.listAccounts();
    const signer = await provider.getSigner(account);
    const Verifier = await hre.ethers.getContractFactory('TurboVerifier');
    const verifierContract = await Verifier.connect(signer).deploy();
    await verifierContract.deployed();

    const fout = readFileSync("./out")
    const reports = JSON.parse(fout.toString().split('\n')[3])
    const { payload: proof } = reports[reports.length-1]

    const result = await verifierContract.verify(Buffer.from(proof, "hex"))
    console.log(`Proof verification successful: ${result}`)
}