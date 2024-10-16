import React from 'react';

interface Wallet {
  id: number;
  type: string;
  balance: number;
}

/**
 * ウォレットページコンポーネント
 * ユーザーの各通貨の残高を表示する
 * @returns {JSX.Element} ウォレットページコンポーネント
 */
const Wallet: React.FC = () => {
  // モックデータ：実際のアプリケーションではAPIから取得する
  const wallets: Wallet[] = [
    { id: 1, type: 'LocalCoin', balance: 5352637 },
    { id: 2, type: 'Cash', balance: 3210358 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Wallet</h2>
      {/* ウォレットリスト */}
      <div className="space-y-4">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{wallet.type}</h3>
            <p className="text-2xl font-bold">¥{wallet.balance.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallet;