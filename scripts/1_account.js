// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de GetBlock
const provider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/f23b2c2d9c7e48ef8f54ef9937b67e8f");

// Función principal asíncrona para interactuar con el proveedor
const main = async () => {
  // Obtiene el balance en bruto (en wei) de la dirección asociada con el nombre ENS "ricmoo.eth"
  const rowBalance = await provider.getBalance("ricmoo.eth");
  console.log("🚀 ~ main ~ rowBalance:", rowBalance);
  
  // Formatea el balance de wei a ether para una mejor legibilidad
  const balance = ethers.utils.formatEther(rowBalance);
  console.log("🚀 ~ main ~ balance:", balance);
  
  // Obtiene el código del contrato en la dirección especificada (USDC en este caso)
  const usdcCode = await provider.getCode("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
  console.log("🚀 ~ main ~ usdcCode:", usdcCode);
  
  // Obtiene el número de transacciones enviadas desde la dirección asociada con el nombre ENS "ricmoo.eth"
  const nonce = await provider.getTransactionCount("ricmoo.eth");
  console.log("🚀 ~ main ~ nonce:", nonce);
};

// Llama a la función principal
main();
