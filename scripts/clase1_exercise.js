// Este script obtiene información detallada sobre un bloque específico en la blockchain de Ethereum 
// utilizando el proveedor JSON-RPC de GetBlock. Luego, formatea y muestra esta información, 
// incluyendo el hash del bloque, la marca de tiempo, el gas utilizado, 
// el minero que validó el bloque y las transacciones incluidas en él.

// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Número del bloque que se va a consultar
const blockNumber = 19748211;

// URL del proveedor JSON-RPC de GetBlock
const endpoint = "https://go.getblock.io/f23b2c2d9c7e48ef8f54ef9937b67e8f";

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de la URL proporcionada
const provider = new ethers.providers.JsonRpcProvider(endpoint);

// Función principal asíncrona para obtener y mostrar información sobre un bloque específico
const main = async () => {
  // Obtiene el ID de la cadena de la red
  const { chainId } = await provider.getNetwork();

  // Obtiene detalles del bloque con las transacciones incluidas
  const {
    hash: blockHash,
    timestamp,
    gasUsed,
    miner,
    transactions,
  } = await provider.getBlockWithTransactions(blockNumber);

  // Formatea las transacciones para mostrar solo los últimos 3 hashes de transacciones
  const _transactions = transactions.slice(transactions.length - 3).map((tx) => {
    const { hash, from, to, value } = tx;
    return {
      hash,
      from,
      to,
      value: ethers.utils.formatEther(value),
    };
  });

  // Objeto que contiene la información del bloque formateada
  const blockObj = {
    blockHash,
    chainId,
    blockNumber,
    timestamp,
    gasUsed: ethers.utils.formatUnits(gasUsed, "wei"),
    miner,
    transactions: _transactions,
  };

  // Imprime el objeto del bloque en la consola
  console.log("Block Obj", blockObj);
};

// Llama a la función principal
main();
