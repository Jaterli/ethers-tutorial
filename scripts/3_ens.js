// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de GetBlock
const provider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/f23b2c2d9c7e48ef8f54ef9937b67e8f");

// Función principal asíncrona para interactuar con el proveedor
const main = async () => {
  // Obtiene el avatar asociado con el nombre ENS "ricmoo.eth"
  const avatar = await provider.getAvatar("ricmoo.eth");
  console.log("🚀 ~ main ~ avatar:", avatar);
  
  // Obtiene el resolver asociado con el nombre ENS "ricmoo.eth"
  const resolver = await provider.getResolver("ricmoo.eth");
  console.log("🚀 ~ main ~ resolver:", resolver);
  
  // Busca la dirección asociada con el nombre ENS "ricmoo.eth"
  const ens = await provider.lookupAddress("0x5555763613a12D8F3e73be831DFf8598089d3dCa");
  console.log("🚀 ~ main ~ ens:", ens);
  
  // Resuelve el nombre ENS "ricmoo.eth" para obtener la dirección asociada
  const address = await provider.resolveName("ricmoo.eth");
  console.log("🚀 ~ main ~ address:", address);
};

// Llama a la función principal
main();
