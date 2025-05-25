import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Transaction {
  id: string;
  amount: number;
  reason: string;
  timestamp: Date;
  txHash: string;
  blockNumber?: number;
  gasUsed?: string;
  status: 'pending' | 'confirmed' | 'failed';
}

interface TokenContextType {
  balance: number;
  addTokens: (amount: number, reason: string) => Promise<string>;
  transactions: Transaction[];
  pendingTransactions: Transaction[];
  totalEarned: number;
  getAccessLevel: () => string;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
};

interface TokenProviderProps {
  children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);

  const generateTxHash = () => {
    return `0x${Math.random().toString(16).substr(2, 64)}`;
  };

  const generateBlockNumber = () => {
    return Math.floor(Math.random() * 1000000) + 8500000; // Realistic block numbers
  };

  const addTokens = async (amount: number, reason: string): Promise<string> => {
    const txHash = generateTxHash();
    const blockNumber = generateBlockNumber();
    
    // Create pending transaction
    const pendingTx: Transaction = {
      id: Date.now().toString(),
      amount,
      reason,
      timestamp: new Date(),
      txHash,
      status: 'pending'
    };

    setPendingTransactions(prev => [...prev, pendingTx]);

    // Simulate blockchain confirmation delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Remove from pending and add to confirmed
        setPendingTransactions(prev => prev.filter(tx => tx.id !== pendingTx.id));
        
        const confirmedTx: Transaction = {
          ...pendingTx,
          status: 'confirmed',
          blockNumber,
          gasUsed: (Math.random() * 50000 + 21000).toFixed(0)
        };

        setTransactions(prev => [confirmedTx, ...prev]);
        setBalance(prev => prev + amount);
        
        resolve(txHash);
      }, 2000 + Math.random() * 3000); // Random delay 2-5 seconds
    });
  };

  const getAccessLevel = () => {
    if (balance >= 1000) return 'VIP';
    if (balance >= 100) return 'Premium';
    if (balance >= 10) return 'Standard';
    return 'Basic';
  };

  const totalEarned = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <TokenContext.Provider value={{ 
      balance, 
      addTokens, 
      transactions, 
      pendingTransactions,
      totalEarned,
      getAccessLevel
    }}>
      {children}
    </TokenContext.Provider>
  );
};