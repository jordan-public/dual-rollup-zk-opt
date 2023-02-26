# on-chain-zk-prover
On-chain so called "zero knowledge" prover (not just verifier).

## Debunking "Zero-Knowledge" (ZK) proofs

Let us define what the common conception of zero-knowledge proof $p$ is:

$p = P_{knowledge}(I_{public}, I_{private})$

in which the Prover $P$ using the publicly known information (inputs) $I_{public} and private inputs $I_{private}$
generates a proof $p$ of a specific $knowledge$, so that there is a Verifier for that $knowledge$ which can be undeniably
convinced (true or false) in the truth of the knowledge:

${convinced} = V_{knowledge}(I_{public})$

Some nice practical features of such prooving system:
- Such proof $p$ should be non-interactive, namely, it can be calculated by the prover at once, and the
verifier does not need to communicate to the prover, but instead complete the verification independently
from just knowing $p$, $I_{public}$ (and of course $V_{knowledge}$, for the specific $knowledge$). 
- $p$ should be Succinct - short and verifiable without burning a lot of resources (computation, memory). 

There are cryptographic proof systems such as zk-SNARK, zk-STARK, PLONK, etc. which can convince the verifier with
extremely high likelyhood, making it computationally next-to-impossible to convince the verifier into false positive
information.

