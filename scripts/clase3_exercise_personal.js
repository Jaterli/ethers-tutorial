// Escuchar el evento de tu propia transacción

// Utilizando la red testnet de Sepolia, con el token Link, se desea realizar una transacción desde una
// wallet principal a otra secundaria. Una vez la transacción haya finalizado, obtener los eventos que
// han ocurrido en el mismo bloque de esa transacción, mostrando únicamente el evento de la
// transacción que hemos realizado. Se desea comprobar por consola el resultado de cada balance,
// antes y después de realizar la transacción, además del evento que ejecutó la transacción.


//COMENZAMOS!!
// Importa el módulo ethers de la biblioteca ethers.js
const { ethers } = require("ethers");

// Crea un proveedor de JSON-RPC para interactuar con la blockchain de Ethereum a través de GetBlock
// Link es un token de la red de Ethereum
const sepoliaProvider = new ethers.providers.JsonRpcProvider("https://go.getblock.io/810b3232c909469ab602aeb9ffa753df");

// Crea una cartera utilizando una clave privada y el proveedor JSON-RPC
const privateKey = "Your-private-key";
const wallet = new ethers.Wallet(privateKey, sepoliaProvider);

// Dirección del smart contract de Link (Sepolia testnet)
const linkTokenAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";

// ABI del contrato del token LINK
const linkTokenABI = [
    // Solo necesitamos el fragmento de la función `transfer`
    "function transfer(address to, uint amount) public returns (bool)",
    "function balanceOf(address owner) view returns (uint256)",

    // Evento emitido cuando se transfiere un token
    "event Transfer(address indexed _from, address indexed _to, uint256 _value)",

];

// Crear una instancia del contrato
const linkTokenContract = new ethers.Contract(linkTokenAddress, linkTokenABI, wallet);

// Dirección de la cuenta destino
const toAddress  = "0xF78F460180D079C4169e8FB13F9a9344444b9Cd9";

// Cantidad de tokens a transferir (en wei). Por ejemplo, para transferir 1 LINK:
// LINK tiene 18 decimales, así que 1 LINK = 1 * 10^18 wei
const amount = ethers.utils.parseUnits('1.0', 18);

async function transferLink() {

    // Llamar a la función `balanceOf` del contrato para obtener el saldo (antes de la TX)
    const balanceAccount1BeforeTX = await linkTokenContract.balanceOf(wallet.address);
    console.log("🚀 ~ main ~ balanceAccount1BeforeTX:", ethers.utils.formatUnits(balanceAccount1BeforeTX, 18));

    // Obtiene el saldo de destino antes de la tx
    const balanceAccount2BeforeTX = await linkTokenContract.balanceOf(toAddress);
    console.log("🚀 ~ main ~ balanceAccount2BeforeTX:", ethers.utils.formatUnits(balanceAccount2BeforeTX, 18));

    try {
        // Llamar a la función `transfer` del contrato
        const tx = await linkTokenContract.transfer(toAddress, amount);
        
        console.log('Transaction hash:', tx.hash);

        // Esperar a que la transacción se confirme
        const receipt = await tx.wait();
        console.log('Transaction confirmed in block:', receipt.blockNumber);

        // Obtiene el saldo de origen antes de la tx
        const balanceAccount1AfterTX = await linkTokenContract.balanceOf(wallet.address);
        console.log("🚀 ~ main ~ balanceAccount1AfterTX:", ethers.utils.formatUnits(balanceAccount1AfterTX, 18));

        // Obtiene el saldo de destino antes de la tx
        const balanceAccount2AfterTX = await linkTokenContract.balanceOf(toAddress);
        console.log("🚀 ~ main ~ balanceAccount2AfterTX:", ethers.utils.formatUnits(balanceAccount2AfterTX, 18));

        // Consulta los eventos del bloque de la transacción efectuada
        const events = await linkTokenContract.queryFilter("Transfer", receipt.blockNumber, receipt.blockNumber);
        console.log("🚀 ~ main ~ events:", events);

    } catch (error) {
      console.error('Error transferring tokens:', error);
    }    
  }

transferLink();
