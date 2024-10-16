import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
}

const CoinList: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    // Fetch coins from API in a real application
    const mockCoins: Coin[] = [
      { id: 'btc', name: 'ビットコイン', symbol: 'BTC', price: 5352637, change: 2.5 },
      { id: 'eth', name: 'イーサリアム', symbol: 'ETH', price: 193478, change: -1.2 },
      { id: 'xrp', name: 'リップル', symbol: 'XRP', price: 50, change: 0.8 },
      { id: 'ltc', name: 'ライトコイン', symbol: 'LTC', price: 13000, change: 1.5 },
    ];
    setCoins(mockCoins);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">取引可能なコイン</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coins.map((coin) => (
          <Link
            key={coin.id}
            to={`/trade/${coin.id}`}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-300"
          >
            {/* Coin details */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinList;