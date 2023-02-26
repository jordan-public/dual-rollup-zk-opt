# on-chain-zk-prover
On-chain so called "zero knowledge" prover (not just verifier).

## Debunking the definition "Zero-Knowledge" (ZK) proofs

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
information. The $knowledge$ in these cryptographic proof systems is described as a set of constraints, which the
constructor of the prover $P_{knowledge}$ and verifier $V_{knowledge}$ can write in a specific language such as Circom,
Zokrates, Noir etc.

Let us distinguish between "zero-knowledge", "some-knowldge" and "validity" proofs:

### True Zero-Knowledge proofs

If in the above definition there is no public input supplied $I_{public} = \emptyset$, let's call that a "true zero-knowledge" proof.

Example (fictitious):

Alice proved that $P \neq NP$, by constructing using a diagonalization method a problem solvable in NP-time which does not belong in the set P of problems solvable in P-time (Don't get excited, this is a fictitious example). 

### Some-Knowledge proofs

### Validity proofs

