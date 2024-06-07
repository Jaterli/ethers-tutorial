// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de GetBlock
const provider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/74d52d7334a04fca8d70bd305d497157");

// Función principal asíncrona para interactuar con el proveedor
const main = async () => {
  // Obtiene información sobre la red a la que está conectado el proveedor
  const network = await provider.getNetwork();

  // Obtiene el precio actual del gas en la red
  const gas = await provider.getGasPrice();

  // Formatea el precio del gas de wei a ether
  const gasFormatted = ethers.utils.formatEther(gas);

  // Obtiene los datos de las tarifas de transacción
  const feeData = await provider.getFeeData();

  // Verifica si el proveedor está listo para ser usado
  const ready = await provider.ready;

  // Imprime el estado de preparación del proveedor en la consola
  console.log("🚀 ~ main ~ ready:", ready);
};

// Llama a la función principal
main();
