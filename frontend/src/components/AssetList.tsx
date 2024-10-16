import React, { useState, useEffect } from 'react';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  change: number;
}

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  useEffect(() => {
    // Fetch assets from API in a real application
    const mockAssets: Asset[] = [
      { id: 'btc', name: 'ビットコイン', symbol: 'BTC', amount: 5352637, change: 79503 },
      { id: 'eth', name: 'イーサリアム', symbol: 'ETH', amount: 5193478, change: 79503 },
      { id: 'eth_classic', name: 'イーサリアムクラシック', symbol: 'ETC', amount: 0, change: 0 },
      { id: 'xrp', name: 'リップル', symbol: 'XRP', amount: 0, change: 0 },
    ];
    setAssets(mockAssets);
    setTotalBalance(mockAssets.reduce((sum, asset) => sum + asset.amount, 0));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">総資産額</h2>
        <p className="text-3xl font-bold text-blue-600">{totalBalance.toLocaleString()}円</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">保有資産</h2>
        <div className="space-y-4">
          {assets.map((asset) => (
            <div key={asset.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  asset.id === 'btc' ? 'bg-orange-500' :
                  asset.id === 'eth' ? 'bg-blue-500' :
                  asset.id === 'eth_classic' ? 'bg-green-500' :
                  'bg-blue-400'
                } text-white font-bold text-lg`}>
                  {asset.symbol.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{asset.name}</h3>
                  <p className="text-sm text-gray-500">{asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{asset.amount.toLocaleString()}円</p>
                <p className={`text-sm ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.change >= 0 ? '+' : '-'}{Math.abs(asset.change).toLocaleString()}円
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetList;