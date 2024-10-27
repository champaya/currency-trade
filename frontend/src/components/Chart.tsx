import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getRateHistory } from "../services/api";
import { subscribeToRates, unsubscribeFromRates } from "../services/websocket";

const mockCoins = [
  {
    id: "btc",
    name: "東京コイン",
  },
  {
    id: "eth",
    name: "神奈川コイン",
  },
  {
    id: "xrp",
    name: "沖縄コイン",
  },
  {
    id: "ltc",
    name: "北海道コイン",
  },
];

interface RateData {
  date: string;
  rate: number;
}

interface Rate {
  numeratorCurrency: string;
  denominatorCurrency: string;
  rate: number;
}

interface Rate {
  numeratorCurrency: string;
  denominatorCurrency: string;
  rate: number;
}

interface RateData {
  date: string;
  rate: number;
}

const Chart: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>(mockCoins[0].id);
  const [rateData, setRateData] = useState<RateData[]>([]);

  useEffect(() => {
    let isSubscribed = true;

    // 初期データの取得
    const fetchInitialData = async () => {
      try {
        const historicalRates = await getRateHistory(selectedCoin);

        if (isSubscribed) {
          const formattedData = historicalRates.data.map((rate) => ({
            date: new Date(rate.createdAt).toLocaleTimeString(),
            rate: rate.rate,
          }));

          setRateData(formattedData);
        }
      } catch (error) {
        console.error("初期データの取得に失敗:", error);
        if (isSubscribed) {
          setRateData([]);
        }
      }
    };

    fetchInitialData();

    // WebSocketの購読を設定
    subscribeToRates((receivedRate: Rate) => {
      if (receivedRate.numeratorCurrency === selectedCoin && isSubscribed) {
        setRateData((prevData) => {
          const newData = [
            ...prevData,
            {
              date: new Date().toLocaleTimeString(),
              rate: receivedRate.rate,
            },
          ];
          return newData;
        });
      }
    });

    // 1分ごとにデータを更新するインターバルを設定
    const intervalId = setInterval(() => {
      if (isSubscribed) {
        const currentTime = new Date().toLocaleTimeString();
        setRateData((prevData) => {
          if (prevData.length > 0) {
            const lastRate = prevData[prevData.length - 1].rate;
            const newData = [
              ...prevData,
              {
                date: currentTime,
                rate: lastRate,
              },
            ];
            return newData;
          }
          return prevData;
        });
      }
    }, 60000);

    return () => {
      isSubscribed = false;
      clearInterval(intervalId);
      unsubscribeFromRates();
    };
  }, [selectedCoin]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="mb-4">
        <label className="block mb-2">地域通貨を選択</label>
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {mockCoins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={rateData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="rate"
              name={`${selectedCoin}レート (円)`}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-500 text-center">
        ※ リアルタイムレート
      </div>
    </div>
  );
};

export default Chart;
