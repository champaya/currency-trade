import React, { useState, useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const DepositWithdraw: React.FC = () => {
  const [balance, setBalance] = useState<number>(100000);
  const [amount, setAmount] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch transactions from API in a real application
    const mockTransactions: Transaction[] = [
      { id: '1', type: 'deposit', amount: 50000, date: '2023-04-01', status: 'completed' },
      { id: '2', type: 'withdrawal', amount: 20000, date: '2023-04-02', status: 'completed' },
      { id: '3', type: 'deposit', amount: 30000, date: '2023-04-03', status: 'pending' },
    ];
    setTransactions(mockTransactions);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('有効な金額を入力してください。');
      return;
    }
    setError('');
    setIsConfirmOpen(true);
  };

  const confirmTransaction = () => {
    const numAmount = Number(amount);
    if (transactionType === 'withdrawal' && numAmount > balance) {
      setError('残高が不足しています。');
      setIsConfirmOpen(false);
      return;
    }

    const newTransaction: Transaction = {
      id: String(Date.now()),
      type: transactionType,
      amount: numAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(prev => transactionType === 'deposit' ? prev + numAmount : prev - numAmount);
    setAmount('');
    setIsConfirmOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">入金・出金</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">現在の残高</h2>
        <p className="text-3xl font-bold text-blue-600">{balance.toLocaleString()}円</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
        {/* Form content */}
      </form>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">取引履歴</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
              {/* Transaction details */}
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        {/* Dialog content */}
      </Dialog>
    </div>
  );
};

export default DepositWithdraw;