// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de GetBlock
const provider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/f23b2c2d9c7e48ef8f54ef9937b67e8f");
const sepoliaProvider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/74d52d7334a04fca8d70bd305d497157");

// Crea una cartera utilizando una clave privada y el proveedor JSON-RPC
const privateKey = "ffd28363420a429a713dbdb2b26608825afeb8b4a52fb43b76356a7da39ba839";
const walletFromPrivateKey = new ethers.Wallet(privateKey, provider);

// Crea una cartera aleatoria
const randomWallet = new ethers.Wallet.createRandom();

// Crea una cartera a partir de una mnemotécnica aleatoria
const randomMnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32));
const walletFromMnemonic = new ethers.Wallet.fromMnemonic(randomMnemonic);

// Función principal asíncrona para realizar operaciones con las carteras
const main = async () => {
  // Define una transacción con destino y valor
  const tx = {
    to: "0xCaefB42461fA2eCd61B9187CDF5bf285383a74f9",
    value: ethers.utils.parseEther("0.015"), // Valor de la transacción en Ether convertido a la unidad mínima (wei)
  };

  // Firma la transacción con la cartera creada a partir de la clave privada
  const txSigned = await walletFromPrivateKey.signTransaction(tx);
  console.log("🚀 ~ main ~ txSigned:", txSigned);
};

// Llama a la función principal
main();
