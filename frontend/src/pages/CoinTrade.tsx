import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { subscribeToRates, unsubscribeFromRates } from "../services/websocket";
import { createTrade } from "../services/api";
import Cookies from "js-cookie";

interface Coin {
  id: string;
  name: string;
}

interface Rate {
  numeratorCurrency: string;
  denominatorCurrency: string;
  rate: number;
}

// モックデータ
const mockCoins = [
  { id: "btc", name: "東京コイン" },
  { id: "eth", name: "神奈川コイン" },
  { id: "xrp", name: "沖縄コイン" },
  { id: "ltc", name: "北海道コイン" },
];

const CoinTrade: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [denominatorCoin, setDenominatorCoin] = useState<Coin | null>(
    mockCoins[0]
  );
  const [rate, setRate] = useState<number>(1);
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    // 選択されたコイン（numerator）
    const selectedCoin = mockCoins.find((c) => c.id === coinId);
    if (selectedCoin) {
      setCoin(selectedCoin);
    } else {
      navigate("/trade");
    }

    // レートの購読
    subscribeToRates((receivedRate: Rate) => {
      if (
        selectedCoin &&
        receivedRate.numeratorCurrency === selectedCoin.id &&
        receivedRate.denominatorCurrency === denominatorCoin?.id
      ) {
        setRate(receivedRate.rate);
      }
    });

    // クリーンアップ: レートの購読を解除
    return () => unsubscribeFromRates();
  }, [coinId, denominatorCoin, navigate]);

  const handleTrade = (e: React.FormEvent) => {
    e.preventDefault();

    if (!coin || !rate || !denominatorCoin) {
      alert("コインまたはレートが選択されていません");
      return;
    }

    const tradeForm = {
      tradeType,
      amount: parseFloat(amount),
      rate,
      localCurrencyName: coin.name,
    };

    const userId = Cookies.get("userId");

    createTrade(
      Number(userId),
      tradeForm.tradeType,
      tradeForm.amount,
      tradeForm.rate,
      tradeForm.localCurrencyName
    )
      .then(() => {
        alert("取引が完了しました");
      })
      .catch(() => {
        alert("取引に失敗しました");
      });
  };

  if (!coin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate("/trade")} className="mb-4">
        <ArrowLeft /> 戻る
      </button>

      <h1 className="text-2xl font-bold mb-4">{coin.name}の取引</h1>

      <div className="mb-4">
        <label>
          レート (1 {coin.name} = {rate ? rate.toFixed(2) : "Loading..."} 円)
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">相手方のコインを選択してください:</label>
        <select
          className="w-full px-4 py-2 border"
          value={denominatorCoin?.id}
          onChange={(e) => {
            const selectedCoin = mockCoins.find(
              (coin) => coin.id === e.target.value
            );
            setDenominatorCoin(selectedCoin || mockCoins[0]);
          }}
        >
          {mockCoins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleTrade}>
        <div className="mb-4">
          <label className="block mb-2">取引タイプ:</label>
          <div className="flex items-center">
            <button
              type="button"
              className={`px-4 py-2 mr-2 ${
                tradeType === "BUY" ? "bg-green-500" : "bg-gray-200"
              }`}
              onClick={() => setTradeType("BUY")}
            >
              購入
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${
                tradeType === "SELL" ? "bg-red-500" : "bg-gray-200"
              }`}
              onClick={() => setTradeType("SELL")}
            >
              売却
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">取引量:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border"
            placeholder="取引量を入力"
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          取引を行う
        </button>
      </form>
    </div>
  );
};

export default CoinTrade;
