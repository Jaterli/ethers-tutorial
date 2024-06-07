// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de GetBlock
const provider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/f23b2c2d9c7e48ef8f54ef9937b67e8f");

// Función principal asíncrona para interactuar con el proveedor
const main = async () => {
  // Obtiene el número del bloque más reciente
  const blockNumber = await provider.getBlockNumber();
  
  // Obtiene el bloque con todas las transacciones incluidas para el bloque específico con el número 19760153
  const block = await provider.getBlockWithTransactions(19760153);
  
  // Imprime el bloque obtenido en la consola
  console.log("🚀 ~ main ~ block:", block);
};

// Llama a la función principal
main();
