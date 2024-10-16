import React, { useState, useEffect } from 'react';
import AssetList from '../components/AssetList';
import Chart from '../components/Chart';

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState<number>(3210358);

  useEffect(() => {
    // Fetch balance from API in a real application
    // For now, we'll use the initial state
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">現在の残高</h2>
        <p className="text-3xl font-bold text-blue-600">{balance.toLocaleString()}円</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">保有コイン</h2>
      <AssetList />
      <Chart />
    </div>
  );
};

export default Dashboard;