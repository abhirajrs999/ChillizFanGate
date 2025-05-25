import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES, FAN_GATE_ABI } from '../config/contracts';

interface DemoContextType {
  balance: number;
  contentCreated: number;
  totalEarned: number;
  isConnected: boolean;
  addReward: (amount: number, reason: string) => Promise<string>;
  createContent: (title: string, description: string) => Promise<string>;
  claimDailyReward: () => Promise<string>;
  connect: () => void;
  transactions: Array<{
    hash: string;
    amount: number;
    reason: string;
    timestamp: Date;
    status: 'success';
    isReal: boolean;
  }>;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
};

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(100000);
  const [contentCreated, setContentCreated] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [transactions, setTransactions] = useState<Array<{
    hash: string;
    amount: number;
    reason: string;
    timestamp: Date;
    status: 'success';
    isReal: boolean;
  }>>([]);

  // Real blockchain hooks
  const { writeContract } = useWriteContract();

  const generateTxHash = () => `0x${Math.random().toString(16).substr(2, 64)}`;

  const addTransaction = (amount: number, reason: string, realTxHash?: string) => {
    const txHash = realTxHash || generateTxHash();
    const transaction = {
      hash: txHash,
      amount,
      reason,
      timestamp: new Date(),
      status: 'success' as const,
      isReal: !!realTxHash,
    };
    setTransactions(prev => [transaction, ...prev]);
    return txHash;
  };

  // Real blockchain transaction + Demo update
  const executeRealAndDemo = async (
    contractFunction: string,
    args: any[],
    amount: number,
    reason: string
  ): Promise<string> => {
    try {
      // 1. Execute REAL blockchain transaction
      const realTxHash = await writeContract({
        address: CONTRACT_ADDRESSES.FAN_GATE as `0x${string}`,
        abi: FAN_GATE_ABI,
        functionName: contractFunction as any,
        args: args,
      });

      console.log('Real blockchain transaction:', realTxHash);

      // 2. Update demo state immediately (for UI)
      setBalance(prev => prev + amount);
      setTotalEarned(prev => prev + amount);
      
      // 3. Add both real and demo transaction to history
      addTransaction(amount, reason, realTxHash);
      
      return realTxHash;
    } catch (error) {
      console.log('Real transaction failed, using demo mode:', error);
      
      // Fallback to demo-only mode
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBalance(prev => prev + amount);
      setTotalEarned(prev => prev + amount);
      return addTransaction(amount, reason);
    }
  };

  const addReward = async (amount: number, reason: string): Promise<string> => {
    return executeRealAndDemo('likeContent', [BigInt(1)], amount, reason);
  };

  const createContent = async (title: string, description: string): Promise<string> => {
    try {
      const result = await executeRealAndDemo(
        'createContent',
        [title, description, 'https://example.com', BigInt(0)],
        50,
        'Content Creation'
      );
      
      setContentCreated(prev => prev + 1);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const claimDailyReward = async (): Promise<string> => {
    return executeRealAndDemo('claimDailyReward', [], 10, 'Daily Activity Reward');
  };

  const connect = () => {
    setIsConnected(true);
  };

  return (
    <DemoContext.Provider value={{
      balance,
      contentCreated,
      totalEarned,
      isConnected,
      addReward,
      createContent,
      claimDailyReward,
      connect,
      transactions,
    }}>
      {children}
    </DemoContext.Provider>
  );
};