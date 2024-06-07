// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de GetBlock
const provider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/f23b2c2d9c7e48ef8f54ef9937b67e8f");

// Define la ABI (Application Binary Interface) del contrato para especificar las funciones y eventos que se pueden interactuar
const abi = [
  // Funciones de lectura del contrato
  "function name() public view returns (string)", // Obtiene el nombre del token
  "function symbol() public view returns (string)", // Obtiene el símbolo del token
  "function totalSupply() public view returns (uint256)", // Obtiene el suministro total del token
  "function balanceOf(address _owner) public view returns (uint256 balance)", // Obtiene el saldo del token de una dirección específica

  // Función de escritura del contrato
  "function transfer(address _to, uint256 _value) public returns (bool success)", // Transfiere tokens a una dirección específica

  // Evento
  "event Transfer(address indexed _from, address indexed _to, uint256 _value)", // Evento emitido cuando se transfiere un token
];

// Dirección del contrato en la blockchain de Ethereum
const contractAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

// Crea una instancia del contrato utilizando la dirección del contrato, la ABI y el proveedor
const contract = new ethers.Contract(contractAddress, abi, provider);

// Función principal asíncrona para interactuar con el contrato
const main = async () => {
  // Obtiene el número del bloque actual
  const blockNumber = await provider.getBlockNumber();

  // Consulta los eventos de Transferencia en el bloque actual
  const events = await contract.queryFilter("Transfer", blockNumber, blockNumber);

  // Imprime los eventos de Transferencia en la consola
  console.log("🚀 ~ main ~ events:", events);
};

// Llama a la función principal
main();
