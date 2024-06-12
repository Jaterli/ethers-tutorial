// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de GetBlock
const sepoliaProvider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/74d52d7334a04fca8d70bd305d497157");

// Crea una cartera utilizando una clave privada y el proveedor JSON-RPC
const privateKey = "ffd...839";
const walletFromPrivateKey = new ethers.Wallet(privateKey, sepoliaProvider);

// Dirección de la cuenta destino
const account2 = "0xCaefB42461fA2eCd61B9187CDF5bf285383a74f9";

// Valores de la transacción
const txValues = {
  to: account2,
  value: ethers.utils.parseEther("0.02"), // Valor de la transacción en Ether convertido a la unidad mínima (wei)
};

// Función principal asíncrona para realizar operaciones con las cuentas y transacciones
const main = async () => {
  // Obtiene el saldo de la cuenta 1
  const balanceAccount1 = await sepoliaProvider.getBalance(walletFromPrivateKey.address);
  console.log("🚀 ~ main ~ balanceAccount1:", ethers.utils.formatEther(balanceAccount1));
  
  // Obtiene el saldo de la cuenta 2
  const balanceAccount2 = await sepoliaProvider.getBalance(account2);
  console.log("🚀 ~ main ~ balanceAccount2:", ethers.utils.formatEther(balanceAccount2));

  // Envía una transacción desde la cuenta 1 a la cuenta 2
  const tx = await walletFromPrivateKey.sendTransaction(txValues);
  await tx.wait();
  console.log("🚀 ~ main ~ tx:", tx);

  // Obtiene el saldo de la cuenta 1 después de la transacción
  const balanceAccount1After = await sepoliaProvider.getBalance(walletFromPrivateKey.address);
  console.log("🚀 ~ main ~ balanceAccount1After:", ethers.utils.formatEther(balanceAccount1After));
  
  // Obtiene el saldo de la cuenta 2 después de la transacción
  const balanceAccount2After = await sepoliaProvider.getBalance(account2);
  console.log("🚀 ~ main ~ balanceAccount2After:", ethers.utils.formatEther(balanceAccount2After));
};

// Llama a la función principal
main();
