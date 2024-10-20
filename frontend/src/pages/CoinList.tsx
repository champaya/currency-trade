import { DollarSign } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Coin {
  id: string;
  name: string;
}

// TODO 一旦コインのデータをモックで作成。将来的にはDBから取得するようにする
const mockCoins = [
  {
    id: "btc",
    name: "東京コイン",
  },
  {
    id: "eth",
    name: "神奈川コイン",
  },
  { id: "xrp", name: "沖縄コイン" },
  {
    id: "ltc",
    name: "北海道コイン",
  },
];

const CoinList: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
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
            <>
              <div className="flex items-center mb-2">
                <DollarSign className="text-green-500 mr-2" />
                <h2 className="text-lg font-bold">{coin.name}</h2>
              </div>
            </>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinList;
