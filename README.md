# Ethers.js Tutorial

## Descripción

Este repositorio contiene ejemplos de uso de muchas de las funciones más importantes de la librería `ethers.js`, separados en varios archivos `.js` para facilitar su localización. `ethers.js` es una librería para interactuar con la blockchain de Ethereum, y esta colección de ejemplos te ayudará a aprender cómo utilizar sus funcionalidades de manera eficiente.

## Contenidos

- **Conexión a Ethereum**
  - `connectToEthereum.js`: Ejemplos de cómo conectarse a diferentes proveedores de Ethereum (Infura, Alchemy, Local Node).

- **Gestión de Cuentas**
  - `walletCreation.js`: Creación y gestión de carteras.
  - `signTransaction.js`: Firmado de transacciones.
  - `sendTransaction.js`: Envío de transacciones.

- **Contratos Inteligentes**
  - `deployContract.js`: Ejemplo de cómo desplegar un contrato inteligente.
  - `interactWithContract.js`: Interacción con contratos desplegados (lectura y escritura de datos).

- **Eventos**
  - `listenForEvents.js`: Escuchar eventos emitidos por contratos inteligentes.
  - `filterEvents.js`: Filtrado de eventos específicos.

- **Utilidades**
  - `utils.js`: Uso de utilidades de `ethers.js` para manipulación de datos y conversiones (BN, Hex, etc.).

## Requisitos

Para utilizar los ejemplos de este repositorio, necesitarás tener Node.js y npm instalados en tu máquina.

### Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/ethersjs-tutorial.git
   cd ethersjs-tutorial
