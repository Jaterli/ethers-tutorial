/*
Obtener información de una dirección ENS

Dado el bloque con número 19748211, programa un
script que devuelva por consola únicamente la
siguiente información, convirtiendo a ethers aquellos
valores que sean necesarios convertir.

- Hash del bloque
- Chain Id del bloque
- Número del bloque
- TimestamL
- Gas utilizado
- Dirección del minero
- Tres últimas transacciones del bloque
    - From
    - To
    - Hash de la transacción
    - Valor de la transacción
    ...
*/

const { ethers } = require("ethers");

const blockNumber = 19748211;
const endpoint = "https://go.getblock.io/72219bea99bc4ceba4a9e5d8e646567e";
const provider = new ethers.providers.JsonRpcProvider(endpoint);

const main = async () => {
    const { chainId } = await provider.getNetwork();
    const {
      hash: blockHash,
      timestamp,
      gasUsed,
      miner,
      transactions,
    } = await provider.getBlockWithTransactions(blockNumber);
    const _transaction = transactions.slice(transactions.length - 3).map((tx) => {
      const { hash, from, to, value } = tx;
      return {
        hash,
        from,
        to,
        value: ethers.utils.formatEther(value),
      };
    });
  
    const blockObj = {
      blockHash,
      chainId,
      blockNumber,
      timestamp,
      gasUsed: ethers.utils.formatUnits(gasUsed, "wei"),
      miner,
      transactions: _transaction,
    };
    console.log("Block Obj", blockObj);
  };
  
  main();