// Este script interactúa con un contrato inteligente en la blockchain de Ethereum utilizando un proveedor JSON-RPC de GetBlock. El contrato inteligente tiene métodos para obtener su nombre, símbolo, y el saldo de una dirección, así como para realizar transferencias de tokens. El script realiza las siguientes acciones:

//     Conecta una cartera a un proveedor JSON-RPC.
//     Consulta el saldo de dos direcciones en el contrato inteligente.
//     Realiza una transferencia de tokens desde la dirección de la cartera a otra dirección.
//     Muestra los saldos actualizados de ambas direcciones y los eventos asociados con la transacción.


// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Proveedor JSON-RPC de Sepolia
const sepoliaProvider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/f796d86f45b54a9aa9892cb9ba79acf8");

// Dirección del contrato LINK
const contractAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";

// ABI (Interfaz de aplicación de contrato) del contrato
const abi = [
  "function name() public view returns (string)",
  "function symbol() public view returns (string)",
  "function balanceOf(address _owner) public view returns (uint256 balance)",
  "function transfer(address _to, uint256 _value) public returns (bool success)",
];

// Crea una instancia del contrato utilizando su dirección y ABI
const contract = new ethers.Contract(contractAddress, abi, sepoliaProvider);

// Clave privada de la cuenta de la cartera
const privateKey = "Your_private-key";
// Crea una cartera utilizando la clave privada y el proveedor JSON-RPC
const wallet = new ethers.Wallet(privateKey, sepoliaProvider);

// Dirección de la cuenta 2
const address = "0xCaefB42461fA2eCd61B9187CDF5bf285383a74f9";

// Función principal asíncrona para realizar operaciones con el contrato inteligente
const main = async () => {
  // Conecta la cartera al contrato inteligente
  const contractWithWallet = contract.connect(wallet);

  // Obtiene el saldo de la cuenta de la cartera en el contrato y lo muestra
  const account1Balance = await contract.balanceOf(wallet.address);
  console.log("🚀 ~ main ~ account1Balance:", ethers.utils.formatEther(account1Balance));

  // Obtiene el saldo de la cuenta 2 en el contrato y lo muestra
  const account2Balance = await contract.balanceOf(address);
  console.log("🚀 ~ main ~ account2Balance:", ethers.utils.formatEther(account2Balance));

  // Realiza una transferencia de tokens desde la cuenta de la cartera a la cuenta 2
  const tx = await contractWithWallet.transfer(address, account1Balance);
  await tx.wait();

  // Obtiene el saldo de la cuenta de la cartera después de la transferencia y lo muestra
  const account1BalanceAfter = await contract.balanceOf(wallet.address);
  console.log("🚀 ~ main ~ account1Balance:", ethers.utils.formatEther(account1BalanceAfter));

  // Obtiene el saldo de la cuenta 2 después de la transferencia y lo muestra
  const account2BalanceAfter = await contract.balanceOf(address);
  console.log("🚀 ~ main ~ account2Balance:", ethers.utils.formatEther(account2BalanceAfter));

  // Obtiene el recibo de la transacción para ver los eventos asociados
  const receipt = await sepoliaProvider.getTransactionReceipt(tx.hash);
  const events = receipt.logs;
  console.log("🚀 ~ main ~ events:", events);
};

// Llama a la función principal
main();
