import { Component } from '@angular/core';
import Web3 from 'web3';

declare const window: any;
// (window as any).global = window;
// if (global === undefined) {
//    var global = window;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-3-16';
  walletInstance: any;
  enable!: Promise<any>;
  address: any;
  balance_: string = "";
  tokenConverted: any;
  web3: any;

  constructor() {
    if (typeof window !== "undefined") {
      if (window.ethereum === undefined) {
        alert('Non-Ethereum browser detected. Install MetaMask');
      } else {
        if (typeof window.web3 !== 'undefined') {
          this.web3 = window.web3.currentProvider;
        }
        // else {
        //   this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
        // }
        window.web3 = new Web3(window.ethereum);
        this.web3 = new Web3(window.ethereum);
        
        this.enable = this.enableMetaMaskAccount(); //use for enable metamash
      }
    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }

  async ngOnInit() {
    this.web3 = new Web3(window.ethereum);
        this.address = await this.web3.eth.getAccounts();
        localStorage.setItem('address',this.address);
        console.log('this.address :>> ', this.address);
    // if (typeof window !== "undefined") {
    //   this.loadBalance();
    //   this.loadTokenBalance();
    // }
  }

  // async loadBalance() {
  //   await window.web3.eth.getBalance(this.address, (error: any, result: any) => {
  //     if (result) {
  //       let converted = window.web3.utils.fromWei(result, 'ether')
  //       this.balance_ = converted;

  //       console.log(" this.balance_:", this.balance_)
  //     }
  //     else {
  //       console.log(error)
  //     }
  //   })


  // }

  // async loadTokenBalance() {
  //   let tokenAddress = "0xba100000625a3754423978a60c9317c58a424e3d";
  //   let walletAddress = this.address;
  //   console.log('this.address :>> ', this.address);

  //   // The minimum ABI to get ERC20 Token balance
  //   let minABI = [{
  //     "inputs": [{
  //       "internalType": "string",
  //       "name": "name",
  //       "type": "string"
  //     }, {
  //       "internalType": "string",
  //       "name": "symbol",
  //       "type": "string"
  //     }],
  //     "stateMutability": "nonpayable",
  //     "type": "constructor"
  //   }, {
  //     "anonymous": false,
  //     "inputs": [{
  //       "indexed": true,
  //       "internalType": "address",
  //       "name": "owner",
  //       "type": "address"
  //     }, {
  //       "indexed": true,
  //       "internalType": "address",
  //       "name": "spender",
  //       "type": "address"
  //     }, {
  //       "indexed": false,
  //       "internalType": "uint256",
  //       "name": "value",
  //       "type": "uint256"
  //     }],
  //     "name": "Approval",
  //     "type": "event"
  //   }, {
  //     "anonymous": false,
  //     "inputs": [{
  //       "indexed": true,
  //       "internalType": "bytes32",
  //       "name": "role",
  //       "type": "bytes32"
  //     }, {
  //       "indexed": true,
  //       "internalType": "address",
  //       "name": "account",
  //       "type": "address"
  //     }, {
  //       "indexed": true,
  //       "internalType": "address",
  //       "name": "sender",
  //       "type": "address"
  //     }],
  //     "name": "RoleGranted",
  //     "type": "event"
  //   }, {
  //     "anonymous": false,
  //     "inputs": [{
  //       "indexed": true,
  //       "internalType": "bytes32",
  //       "name": "role",
  //       "type": "bytes32"
  //     }, {
  //       "indexed": true,
  //       "internalType": "address",
  //       "name": "account",
  //       "type": "address"
  //     }, {
  //       "indexed": true,
  //       "internalType": "address",
  //       "name": "sender",
  //       "type": "address"
  //     }],
  //     "name": "RoleRevoked",
  //     "type": "event"
  //   }, {
  //     "anonymous": false,
  //     "inputs": [{
  //       "indexed": false,
  //       "internalType": "uint256",
  //       "name": "id",
  //       "type": "uint256"
  //     }],
  //     "name": "Snapshot",
  //     "type": "event"
  //   }, {
  //     "anonymous": false,
  //     "inputs": [{
  //       "indexed": true,
  //       "internalType": "address",
  //       "name": "from",
  //       "type": "address"
  //     }, {
  //       "indexed": true,
  //       "internalType": "address",
  //       "name": "to",
  //       "type": "address"
  //     }, {
  //       "indexed": false,
  //       "internalType": "uint256",
  //       "name": "value",
  //       "type": "uint256"
  //     }],
  //     "name": "Transfer",
  //     "type": "event"
  //   }, {
  //     "inputs": [],
  //     "name": "DEFAULT_ADMIN_ROLE",
  //     "outputs": [{
  //       "internalType": "bytes32",
  //       "name": "",
  //       "type": "bytes32"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [],
  //     "name": "DOMAIN_SEPARATOR",
  //     "outputs": [{
  //       "internalType": "bytes32",
  //       "name": "",
  //       "type": "bytes32"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [],
  //     "name": "MINTER_ROLE",
  //     "outputs": [{
  //       "internalType": "bytes32",
  //       "name": "",
  //       "type": "bytes32"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [],
  //     "name": "PERMIT_TYPEHASH",
  //     "outputs": [{
  //       "internalType": "bytes32",
  //       "name": "",
  //       "type": "bytes32"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [],
  //     "name": "SNAPSHOT_ROLE",
  //     "outputs": [{
  //       "internalType": "bytes32",
  //       "name": "",
  //       "type": "bytes32"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "owner",
  //       "type": "address"
  //     }, {
  //       "internalType": "address",
  //       "name": "spender",
  //       "type": "address"
  //     }],
  //     "name": "allowance",
  //     "outputs": [{
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "spender",
  //       "type": "address"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "amount",
  //       "type": "uint256"
  //     }],
  //     "name": "approve",
  //     "outputs": [{
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "account",
  //       "type": "address"
  //     }],
  //     "name": "balanceOf",
  //     "outputs": [{
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "account",
  //       "type": "address"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "snapshotId",
  //       "type": "uint256"
  //     }],
  //     "name": "balanceOfAt",
  //     "outputs": [{
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "uint256",
  //       "name": "amount",
  //       "type": "uint256"
  //     }],
  //     "name": "burn",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "account",
  //       "type": "address"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "amount",
  //       "type": "uint256"
  //     }],
  //     "name": "burnFrom",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [],
  //     "name": "decimals",
  //     "outputs": [{
  //       "internalType": "uint8",
  //       "name": "",
  //       "type": "uint8"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "spender",
  //       "type": "address"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "subtractedValue",
  //       "type": "uint256"
  //     }],
  //     "name": "decreaseAllowance",
  //     "outputs": [{
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "bytes32",
  //       "name": "role",
  //       "type": "bytes32"
  //     }],
  //     "name": "getRoleAdmin",
  //     "outputs": [{
  //       "internalType": "bytes32",
  //       "name": "",
  //       "type": "bytes32"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "bytes32",
  //       "name": "role",
  //       "type": "bytes32"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "index",
  //       "type": "uint256"
  //     }],
  //     "name": "getRoleMember",
  //     "outputs": [{
  //       "internalType": "address",
  //       "name": "",
  //       "type": "address"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "bytes32",
  //       "name": "role",
  //       "type": "bytes32"
  //     }],
  //     "name": "getRoleMemberCount",
  //     "outputs": [{
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "bytes32",
  //       "name": "role",
  //       "type": "bytes32"
  //     }, {
  //       "internalType": "address",
  //       "name": "account",
  //       "type": "address"
  //     }],
  //     "name": "grantRole",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "bytes32",
  //       "name": "role",
  //       "type": "bytes32"
  //     }, {
  //       "internalType": "address",
  //       "name": "account",
  //       "type": "address"
  //     }],
  //     "name": "hasRole",
  //     "outputs": [{
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "spender",
  //       "type": "address"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "addedValue",
  //       "type": "uint256"
  //     }],
  //     "name": "increaseAllowance",
  //     "outputs": [{
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "to",
  //       "type": "address"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "amount",
  //       "type": "uint256"
  //     }],
  //     "name": "mint",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [],
  //     "name": "name",
  //     "outputs": [{
  //       "internalType": "string",
  //       "name": "",
  //       "type": "string"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "",
  //       "type": "address"
  //     }],
  //     "name": "nonces",
  //     "outputs": [{
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "owner",
  //       "type": "address"
  //     }, {
  //       "internalType": "address",
  //       "name": "spender",
  //       "type": "address"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "value",
  //       "type": "uint256"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "deadline",
  //       "type": "uint256"
  //     }, {
  //       "internalType": "uint8",
  //       "name": "v",
  //       "type": "uint8"
  //     }, {
  //       "internalType": "bytes32",
  //       "name": "r",
  //       "type": "bytes32"
  //     }, {
  //       "internalType": "bytes32",
  //       "name": "s",
  //       "type": "bytes32"
  //     }],
  //     "name": "permit",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "bytes32",
  //       "name": "role",
  //       "type": "bytes32"
  //     }, {
  //       "internalType": "address",
  //       "name": "account",
  //       "type": "address"
  //     }],
  //     "name": "renounceRole",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "bytes32",
  //       "name": "role",
  //       "type": "bytes32"
  //     }, {
  //       "internalType": "address",
  //       "name": "account",
  //       "type": "address"
  //     }],
  //     "name": "revokeRole",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [],
  //     "name": "snapshot",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [],
  //     "name": "symbol",
  //     "outputs": [{
  //       "internalType": "string",
  //       "name": "",
  //       "type": "string"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [],
  //     "name": "totalSupply",
  //     "outputs": [{
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "uint256",
  //       "name": "snapshotId",
  //       "type": "uint256"
  //     }],
  //     "name": "totalSupplyAt",
  //     "outputs": [{
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "recipient",
  //       "type": "address"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "amount",
  //       "type": "uint256"
  //     }],
  //     "name": "transfer",
  //     "outputs": [{
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [{
  //       "internalType": "address",
  //       "name": "sender",
  //       "type": "address"
  //     }, {
  //       "internalType": "address",
  //       "name": "recipient",
  //       "type": "address"
  //     }, {
  //       "internalType": "uint256",
  //       "name": "amount",
  //       "type": "uint256"
  //     }],
  //     "name": "transferFrom",
  //     "outputs": [{
  //       "internalType": "bool",
  //       "name": "",
  //       "type": "bool"
  //     }],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }, {
  //     "inputs": [],
  //     "name": "version",
  //     "outputs": [{
  //       "internalType": "string",
  //       "name": "",
  //       "type": "string"
  //     }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }]

  //   // Get ERC20 Token contract instance
  //   let contract = new window.web3.eth.Contract(minABI, tokenAddress);


  //   // Call balanceOf function
  //   await contract.methods.balanceOf(walletAddress).call().then((result: any) => {
  //     this.tokenConverted = window.web3.utils.fromWei(result, 'ether')
  //     console.log(result);
  //   });

  // }

  // async connect() {
  //   const provider = await this.getProvider();
  //   const web3 = new Web3(provider);

  //   // Now you can use web3 to interact with the Ethereum network.
  //   // For example:
  //   const accounts = await web3.eth.getAccounts();
  //   console.log('Connected account:', accounts[0]);
  // }

  // async getProvider(): Promise<any> {
  //   const providerOptions = {
  //     walletconnect: {
  //       package: WalletConnectProvider, // required
  //       options: {
  //         infuraId: 'env', // required change this with your own infura id
  //         description: 'Scan the qr code and sign in',
  //         qrcodeModalOptions: {
  //           mobileLinks: [
  //             'rainbow',
  //             'metamask',
  //             'argent',
  //             'trust',
  //             'imtoken',
  //             'pillar'
  //           ]
  //         }
  //       }
  //     },
  //     injected: {
  //       display: {
  //         logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
  //         name: 'metamask',
  //         description: "Connect with the provider in your Browser"
  //       },
  //       package: null
  //     },
  //   };
  //   const web3Modal = new Web3Modal({
  //     network: "mainnet", // optional change this with the net you want to use like rinkeby etc
  //     cacheProvider: true, // optional
  //     providerOptions, // required
  //     theme: {
  //       background: "rgb(39, 49, 56)",
  //       main: "rgb(199, 199, 199)",
  //       secondary: "rgb(136, 136, 136)",
  //       border: "rgba(195, 195, 195, 0.14)",
  //       hover: "rgb(16, 26, 32)"
  //     }
  //   });

  //   const provider = await web3Modal.connect();

  //   return provider;
  // }
}
