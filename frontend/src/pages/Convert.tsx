import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { getWallets, convertToLocalCurrency } from "../services/api";
import Cookies from "js-cookie";

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

const Convert: React.FC = () => {
  const [cashBalance, setCashBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    mockCoins[0].name
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const userId = Cookies.get("userId");

    getWallets(Number(userId)).then((response) => {
      // 現金残高を設定
      const cashWallet = response.data.find(
        (wallet) => wallet.currencyType === "CASH"
      );
      setCashBalance(cashWallet?.balance || 0);
    });
  }, []);

  const handleSubmit = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("有効な金額を入力してください。");
      return;
    }
    if (Number(amount) > cashBalance) {
      setError("残高が不足しています。");
      return;
    }
    setError("");
    setIsConfirmOpen(true);
  };

  const confirmConversion = () => {
    const userId = Number(Cookies.get("userId"));
    convertToLocalCurrency(userId, Number(amount), selectedCurrency)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setError("変換に失敗しました。");
        setIsConfirmOpen(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">地域通貨への変換</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">現金残高</h2>
        <p className="text-3xl font-bold text-blue-600">
          {cashBalance.toLocaleString()}円
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2">変換する金額 (円)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">変換先の地域通貨</label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {mockCoins.map((coin) => (
              <option key={coin.id} value={coin.name}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          変換する
        </button>
      </div>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
            <Dialog.Title className="text-lg font-bold">
              変換の確認
            </Dialog.Title>
            <Dialog.Description className="mt-2">
              {`${Number(
                amount
              ).toLocaleString()}円を${selectedCurrency}に変換しますか？`}
            </Dialog.Description>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setIsConfirmOpen(false)}
              >
                キャンセル
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={confirmConversion}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Convert;
