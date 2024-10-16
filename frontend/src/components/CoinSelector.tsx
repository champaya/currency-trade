import React from 'react';
import { Link } from 'react-router-dom';

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

interface CoinSelectorProps {
  currentCoinId: string;
}

const CoinSelector: React.FC<CoinSelectorProps> = ({ currentCoinId }) => {
  const coins: Coin[] = [
    { id: 'btc', name: 'ビットコイン', symbol: 'BTC' },
    { id: 'eth', name: 'イーサリアム', symbol: 'ETH' },
    { id: 'xrp', name: 'リップル', symbol: 'XRP' },
    { id: 'ltc', name: 'ライトコイン', symbol: 'LTC' },
  ];

  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
      {coins.map((coin) => (
        <Link
          key={coin.id}
          to={`/trade/${coin.id}`}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            coin.id === currentCoinId
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {coin.symbol}
        </Link>
      ))}
    </div>
  );
};

export default CoinSelector;