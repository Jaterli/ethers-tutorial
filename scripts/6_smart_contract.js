// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de GetBlock
// Al conectarnos a través de un objeto provider, el contrato solo tendrá permisos de lectura.
// Si lo hacemos a través de un signer, el contrato tendrá permisos de lectura y de escritura.
const sepoliaProvider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/ce22d55166e348ba9f69b46b7b9f2c85");

// Dirección del contrato inteligente (token Link, token del standard ERC-20)
const contractAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";

// ABI (Interfaz de aplicación de contrato) del smart contract
const abi = [
  // Métodos de lectura del contrato ERC-20
  "function name() public view returns (string)",
  "function symbol() public view returns (string)",
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address _owner) public view returns (uint256 balance)",

  // Métodos de escritura del contrato
  "function transfer(address _to, uint256 _value) public returns (bool success)",

  // Eventos del contrato
  "event Transfer(address indexed _from, address indexed _to, uint256 _value)",
];

// Crea una instancia del contrato inteligente utilizando su dirección y ABI
const contract = new ethers.Contract(contractAddress, abi, sepoliaProvider);

// Clave privada de la cuenta de la cartera
const privateKey = "ffd......839";
// Crea una cartera utilizando la clave privada y el proveedor JSON-RPC
const wallet = new ethers.Wallet(privateKey, sepoliaProvider);
// Dirección de la cuenta 2
const account2 = "0xCaefB42461fA2eCd61B9187CDF5bf285383a74f9";

// Función principal asíncrona para realizar operaciones con el contrato inteligente
const main = async () => {
  // Obtiene el nombre del contrato
  const name = await contract.name();
  console.log("🚀 ~ main ~ name:", name);

  // Obtiene el símbolo del contrato
  const symbol = await contract.symbol();
  console.log("🚀 ~ main ~ symbol:", symbol);

  // Obtiene el suministro total del contrato en unidades wei y lo convierte a ether
  const totalSupply = await contract.totalSupply();
  const totalSupplyWei = ethers.utils.formatUnits(totalSupply, "wei");
  console.log("🚀 ~ main ~ totalSupplyWei:", totalSupplyWei);

  // Obtiene el saldo de la cuenta de la cartera en el contrato y lo convierte a ether
  const balanceAccount = await contract.balanceOf(wallet.address);
  const balanceAccountEther = ethers.utils.formatEther(balanceAccount);
  console.log("🚀 ~ main ~ balanceAccountEther:", balanceAccountEther);

  // Obtiene el saldo de la cuenta 2 en el contrato y lo convierte a ether
  const balanceAccount2Ether = await contract.balanceOf(account2);
  console.log("🚀 ~ main ~ balanceAccount2Ether:", ethers.utils.formatEther(balanceAccount2Ether));

  // Conecta la cartera al contrato inteligente para realizar una transferencia
  const contractWithWallet = contract.connect(wallet);

  // Realiza una transferencia de la cuenta de la cartera a la cuenta 2 con el saldo de la cuenta de la cartera
  const tx = await contractWithWallet.transfer(account2, balanceAccount);
  await tx.wait();
  console.log("🚀 ~ main ~ tx:", tx);

  // Obtiene el saldo de la cuenta de la cartera después de la transferencia
  const balanceAccountAfter = await contract.balanceOf(wallet.address);
  console.log("🚀 ~ main ~ balanceAccountAfter:", ethers.utils.formatEther(balanceAccountAfter));

  // Obtiene el saldo de la cuenta 2 después de la transferencia
  const balanceAccount2EtherAfter = await contract.balanceOf(account2);
  console.log("🚀 ~ main ~ balanceAccount2Ether:", ethers.utils.formatEther(balanceAccount2EtherAfter));
};

// Llama a la función principal
main();
