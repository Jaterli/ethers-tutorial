// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de GetBlock
const provider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/f23b2c2d9c7e48ef8f54ef9937b67e8f");

// Dirección de la cuenta destino
const acc2 = "0xCaefB42461fA2eCd61B9187CDF5bf285383a74f9";

// Función principal asíncrona para realizar operaciones con la cuenta y transacciones
const main = async () => {
  // Objeto que representa la transacción a enviar, con la dirección destino y el valor en ether
  const transaction = {
    to: acc2,
    value: ethers.utils.parseEther("0.0015"), // Valor de la transacción en Ether convertido a la unidad mínima (wei)
  };

  // Estima el gas necesario para la transacción
  const estimatedGas = await provider.estimateGas(transaction);
  console.log("🚀 ~ main ~ estimatedGas:", estimatedGas);

  // Convierte el gas estimado a Gwei para una mejor comprensión
  const estimatedGasGwei = ethers.utils.formatUnits(estimatedGas, "gwei");
  console.log("🚀 ~ main ~ estimatedGasGwei:", estimatedGasGwei);

  // Obtiene los detalles de una transacción específica utilizando su hash
  const tx = await provider.getTransaction("0x1d2cd05965840e5dfda068220cb174f854696141a3d1deac828f4e29aae6f690");
  console.log("🚀 ~ main ~ tx:", tx);
  
  // Imprime el valor de la transacción en Ether
  console.log("Tx value", ethers.utils.formatEther(tx.value));
};

// Llama a la función principal
main();
