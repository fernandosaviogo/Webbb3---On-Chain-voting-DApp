This is a [Vite](https://vitejs.dev) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).

# Webbb3 — DApp de votação on-chain (BSC Testnet)

Aplicação **React + Vite + TypeScript** para votação on-chain (tema BBB) com conexão de **qualquer carteira EVM injetada** (MetaMask/Brave/OKX/Trust/Coinbase Ext., etc.) via **wagmi 3.4.1**.  
Rede alvo: **BSC Testnet**.

## Funcionalidades

- Conexão com **qualquer carteira injetada** (via `injected()`).
- Estados de conexão: conectando, conectado, desconectado e mensagens de erro amigáveis.
- Verificação de rede e **troca para BSC Testnet** com um clique.
- Stack moderno: Vite + React + TypeScript + wagmi + TanStack Query.
- Pronto para evoluir: WalletConnect, MetaMask SDK, múltiplas chains, etc.

---

## Arquitetura & Principais Dependências

- **Frontend:** Vite (React + TS)
- **Web3:** wagmi 3.4.1 (hooks), viem (peer do wagmi)
- **Estado assíncrono:** @tanstack/react-query
- **UI:** Bootstrap (CSS local/importado)
- **Rede padrão:** BSC Testnet

## Começando

### 1) Pré-requisitos
- **Node.js 18+** (recomendado 20+)
- **npm** (ou pnpm/yarn)
- Extensão de carteira (p. ex. **MetaMask**) instalada no navegador.

### 2) Instalação
```bash
npm install
# ou
pnpm install
# ou
yarn
```

### 3) Rodando em desenvolvimento
```bash
npm run dev

### 4) Build de produção
```bash
npm run build