```markdown
# Ration DApp

A decentralized application (DApp) for transparent and secure ration distribution using blockchain technology.

## 🚀 Features

- **Decentralized Ration Claiming:** Users can claim their monthly ration directly on the blockchain.
- **MetaMask Integration:** Secure wallet connection for user authentication and transaction signing.
- **Role-based Access:** Only registered users can claim ration.
- **Claim History:** Users can view their past claims.
- **Modern UI:** Built with React and Material UI for a clean, responsive experience.
- **Modular Codebase:** Separate folders for frontend, backend, and blockchain smart contracts.

## 📁 Project Structure

```
ration-dapp/
│
├── frontend/      # React app (user interface)
├── backend/       # Node.js/NestJS backend (API & DB)
├── blockchain/    # Smart contracts (Solidity, Hardhat)
└── README.md
```

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ration-dapp.git
cd ration-dapp
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

#### Blockchain

```bash
cd ../blockchain
npm install
```

### 3. Configure Environment

- **Frontend:**  
  Update API URLs and contract addresses in the config files if needed.
- **Backend:**  
  Set up your `.env` file for database and JWT secrets.
- **Blockchain:**  
  Deploy smart contracts using Hardhat and update the contract address in frontend/backend.

### 4. Run the Apps

#### Start Blockchain (Hardhat local node)

```bash
cd blockchain
npx hardhat node
```

#### Deploy Smart Contract

```bash
npx hardhat run scripts/deploy.js --network localhost
```

#### Start Backend

```bash
cd ../backend
npm run start:dev
```

#### Start Frontend

```bash
cd ../frontend
npm start
```

## 🦊 MetaMask Setup

- Install [MetaMask](https://metamask.io/) browser extension.
- Add the local or testnet network (e.g., Hardhat, Mumbai, Goerli).
- Import an account with test ETH for transactions.

## 💡 How It Works

1. **User registers and logs in.**
2. **Connects MetaMask wallet.**
3. **Fills claim form and submits.**
4. **Transaction is sent to the blockchain.**
5. **User can view claim history.**

## 📜 Smart Contract

- Written in Solidity.
- Handles ration claim logic and stores claim records on-chain.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.


**Made with ❤️ for learning and transparency in ration distribution.**
```
