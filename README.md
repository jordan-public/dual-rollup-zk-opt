[This project](https://app.buidlbox.io/projects/dual-rollup-zk-opt) won the second prize from [Cartesi](https://cartesi.io/) at [ETHDenver 2023](https://app.buidlbox.io/ethdenver/ethdenver-2023).

# dual-rollup-zk-opt
## Demo
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#/https://github.com/jordan-public/dual-rollup-zk-opt/)

See instructions [here](zkprover/README.md).

## Where can this run

We are running our demo on a development installation on a GitPod Linux machine, which runs Cartesi Rollup, Cartesi VM in Host Mode and a Hardhat EVM instance. However, this can run wherever Cartesi has installations, apparently as follows at the time of this writing:
- Ethereum (mainnet)
- BSC Testnet
- Optimism Görli
- Arbitrum Görli
- Polygon Mumbai
- Görli
- Gnosis Chiado

In addition to our test environment running in Host Mode, any of the above should have a WASM interpreter installed inside the (appropriate version of) Cartesi VM.

## Abstract

We are providing a working proof-of-concept mechanism of Dual Rollup: ZK Rollup and Optimistic Rollup in one. Cartesi already provides Optimistic Rollup functionality. In addition, we run ZK Rollup functionality, which can be "claimed" at any time by anyone.
If the Optimistic Rollup rolls back as a result of a fraud proof,
next time it proceeds is going to be from the new Ethereum -Layer 1 (L1) state, which fits well.

To achieve this we run zero-knowledge proofs (actually Validity Proofs) where both the Prover and the Verifier can run on a public blockchain.

Running the verifier on Ethereum Virtual Machine (EVM) is relatively
inexpensive and feasible for many applications. However, running the
prover requires more computational resources, and as such is running in a Cartesi virtual machine.

We deploy Aztec PLONK Validity Proofs written in Noir,
into Cartesi virtual machine executable provers and EVM verifiers.

The limitation (as a result of feasibility) is that the Layer 2 ZK Rollup is running an EVM. Since this is a proof of concept, instead of proofs of state transitions of the EVM, we are deploying a dummy
Noir program, just to show that this is feasible. In reality, the
claim would have to include the new EVM state (or difference from the previous) along with the proof that the new state resulted from execution of the sequence of EVM instructions on L2.

## Debunking the "Zero-Knowledge" (ZK) terminology

> Let us define what the common conception of zero-knowledge proof $p$ of some theorem $T$ is:
>
> $p = P_{T}(I_{public}, I_{private})$
>
> in which the Prover $P$ using the publicly known information (inputs) $I_{public}$ and private inputs $I_{private}$
generates a proof $p$ of a specific $T$, so that there is a Verifier for that $T$ which can be undeniably
convinced (true or false) in the truth of the knowledge:
>
> ${convinced} = V_{T}(I_{public})$


Some nice practical features of such prooving system:
- Such proof $p$ should be non-interactive, namely, it can be calculated by the prover at once, and the
verifier does not need to communicate to the prover, but instead complete the verification independently
from just knowing $p$, $I_{public}$ (and of course $V_{T}$, for the specific $T$). 
- $p$ should be Succinct - short and verifiable without burning a lot of resources (computation, memory). 

There are cryptographic proof systems such as zk-SNARK, zk-STARK, PLONK, etc. which can convince the verifier with
extremely high likelyhood, making it computationally next-to-impossible to convince the verifier into false positive
information. $T$ in these cryptographic proof systems is described as a set of constraints, which the
constructor of the prover $P_{T}$ and verifier $V_{T}$ can write in a specific language such as Circom,
Zokrates, Snarky.js, Noir etc.

Let us distinguish between "pure zero-knowledge", "some-knowldge" and "validity" proofs:

### Pure Zero-Knowledge Proofs

If in the above definition there is no public input supplied $I_{public} = \emptyset$, let's call that a "pure zero-knowledge" proof.


>Example (fictitious):
>
> Alice proved that $P \neq NP$, by constructing using a diagonalization method a problem counter-example $E$, solvable in NP-time which does not belong to the set P of problems solvable in P-time (don't get excited, this is a fictitious example). She constructs a  pure zero-knowledge proof 
>
> $p = P_{P \neq NP}(\emptyset, \{E\})$
>
>to convince everyone that she has the proof, without showing the actual proof (the counter-example E). Now (any) Bob can take $p$ and verify that Alice actually knows how to prove that $P \neq NP$:
>
>$V_{P \neq NP}(\emptyset) = {true}$



Pure zero-knowledge proofs can be made for one-time use, and as such are not practical for applications that respond to (public in our terminology) input. 

### Some-Knowledge Proofs

If not all knowledge is secret ($I_{public} \neq \emptyset$) but only some of it ($I_{private} \neq \emptyset$), this is what most commonly named "zero-knowledge" because of it's practical use. 

> Example (this is a real example): Tornado.cash
>
> This is the most popular practical zero-knowledge web3 application. The user obtains privacy by hiding the trace of asset transfers via smart contracts that serve the purpose of "mixers". The user can deposit assets (1 ETH, for example) into one of it's smart contracts and generate a proof of deposit $p$. 
> This deposit can be withdrawn into any (unrelated) address, but to assure that the withdrawal is allowed only once per deposit, the contract will dispense the funds (the 1 ETH in our example) upon successful verification of the proof of deposit, along with a "nullifier". The nullifier is recorded upon withdrawal in order to prevent the user from withdrawing the same deposited funds more than once. 
>
> In this example, the secret input $I_{private}$ is the deposit transaction, and the public input the root of the Merkle Tree of nullifiers. 

Some-Knowledge proofs are practical for blockchain use cases where the prover is off-chain, while the verifier is on-chain.

*Importantly*, if $I_{private} \neq \emptyset$, the prover cannot execute on-chain (in a smart contract) on transparent blockchains such as Ethereum. Any information fed as input to the smart contract
is publicly recorded on the blockchain, so there is no possibility to
feed the prover with private input.
### Validity Proofs

If $I_{private} = \emptyset$ the proof becomes a "Validity Proof". We are not trying to hide any information, but simply providing a cryptographic proof (well, with extremely high likelyhood) of the claim represented by $I_{public}$.

> Example (this is also a real example): zkSync
>
> zkSync is a Layer 2 (L2) blockchain which allows trustless transfer of Layer 1 (L1) assets, in this case Ethereum, in both directions, using a rollup. zkSync allows execution of EVM code (well, EVM-compatible) on the L2. Snapshots of the L2 EVM state are recorded, and state roll-ups are transferred to L1 along with a Validity Proof that correct execution of the EVM on L2 caused a transition of its previous L2 EVM state to the current L2 EVM state. This allows fast and inexpensive (gas-efficient) transactions on L2, with ability to transfer the assets back to L1 without waiting for a long time (as in the case of Optimistic Rollups where a grace period has to be allowed for potential validity challenges). The provers in this example are the zkSync validators nodes, while the verifier is running on the L1 EVM (because it's succinct and relatively inexpensive as such). There is no secret input, as everything is transparent, and the validity proofs are not trying to hide anything, but merely transfer proofs of correct execution from L2 to L1, giving the users a trustless (no need to trust anyone) experience.

*Importantly*, as there are no secrets ($I_{private} = \emptyset$), both the prover and the verifier of the Validity Proofs could concievably run on-chain, but there is one problem: the prover's job is computationally intensive.

## Prover on Cartesi

The prover is too computationally (and memory) intensive to  run in an EVM. However Cartesi provides L2 rollups which execute RISC-V virtual machines with richer possibility of computational and memory  resources. This is made possible because not every validator in Cartesi is forced to run every RISC-V virtual machine instance. Whoever validator can challenge the correctness of any such virtual machine instance at their own expense in exchange for fraud proof reward. 

Here is how the entire system works:

- Setup:
    - The user writes the prover + verifier in Noir. 
    - Noir code is compiled into WASM PLONK prover and EVM PLONK verifier. 
    - The prover WASM prover code along with WASM interpreter for RISC-V is submitted to the Cartesi as part of the virtual machine instance initialization.
    - The verifier is deployed to Ethereum (L1) as smart contract.
- Operation:
    - Inputs are supplied from the front-end to the Cartesi rollup and picked up by the Cartesi backend.
    - The Cartesi backend generates proofs and records them on the L1 (Ethereum) as Notices, but also as Reports.
    - Upon contract call on L1, without waiting for Cartesi epoch finalization, the caller can pick up the proof from the Report and supply it as parameter to the EVM call.
    - The deployed verifier can pick up a recorded proof and verify it on-chain. This can happen before the Cartesi epoch is finalized.

## Result

The end result of this proof-of-concept is the ability to generate effective changes on L1 without waiting for the end of the Cartesi epoch.

Consequently, the following use cases are feasible:
### Dual Rollup
The L2 EVM inside Cartesi VM would inherit the advantages from both Optimistic and ZK Rollups. If an important transfer such as large amount of funds is being transferred, then the ZK Rollup functionality would be used. On the other hand, if the outcome is not of great importance, like a casual chess game result, then Rollup
functionality would be left to the built-in Optimistic Rollup on Cartesi. 

### Simple asset transfers 

With proofs of deposit to L1 transfer contract (to L2) simple “impatient” L2 to L1 asset transfers upon request could be achieved.

### Universal ZK Bridge

Provided a guarantee of no **identical** blockchain replicas (including chain ID) so that each blockchain can be identified on-chain, **Universal ZK Bridge** can be developed using a simple
zk-proof of deposit.
