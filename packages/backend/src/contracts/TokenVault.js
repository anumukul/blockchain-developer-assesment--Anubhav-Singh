'use strict';

const { getContract, setContract, getWallet, setWallet } = require('../store/chainStore');

/**
 * Simulated smart contract: TokenVault
 * Candidates may need to fix bugs (e.g. overflow, access control, return value).
 */
function deposit(contractAddress, fromAddress, amount) {
  const contract = getContract(contractAddress);
  const wallet = getWallet(fromAddress);
  if (!contract || !wallet) return { success: false, error: 'Contract or wallet not found' };
  const amountBigInt = BigInt(amount);
  if (wallet.balance < amountBigInt) return { success: false, error: 'Insufficient balance' };

  // BUG: Candidate should fix - contract balance should increase, wallet balance decrease
  contract.balance += amountBigInt;
  wallet.balance -= amountBigInt;
  setContract(contractAddress, contract);
  setWallet(fromAddress, wallet);
  return { success: true, newContractBalance: String(contract.balance) };
}

function withdraw(contractAddress, toAddress, amount, callerAddress) {
  const contract = getContract(contractAddress);
  if (!contract) return { success: false, error: 'Contract not found' };
  // TODO: Candidate - add check: only contract.owner may call withdraw
  if (callerAddress.toLowerCase() !== contract.owner.toLowerCase()) {
    return { success: false, error: 'Only the contract owner can withdraw' };
  }
  const amountBigInt = BigInt(amount);
  if (contract.balance < amountBigInt) return { success: false, error: 'Insufficient contract balance' };

  let toWallet = getWallet(toAddress);
  if (!toWallet) toWallet = { balance: 0n, nonce: 0 };
  contract.balance -= amountBigInt;
  toWallet.balance += amountBigInt;
  setContract(contractAddress, contract);
  setWallet(toAddress, toWallet);
  return { success: true, newContractBalance: String(contract.balance) };
}

function balanceOf(contractAddress) {
  const contract = getContract(contractAddress);
  if (!contract) return { success: false, error: 'Contract not found' };
  // FIX: Candidate - return balance as string for JSON compatibility
  return { success: true, balance: String(contract.balance) };
}

module.exports = {
  deposit,
  withdraw,
  balanceOf
};
