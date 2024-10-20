import React, { useState, useEffect } from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { Dialog } from "@headlessui/react";
import {
  cashDeposit,
  cashWithdrawal,
  getCashTransactions,
  getWallets,
  Transaction,
} from "../services/api";
import Cookies from "js-cookie";

const DepositWithdraw: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [transactionType, setTransactionType] = useState<
    "DEPOSIT" | "WITHDRAWAL"
  >("DEPOSIT");
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>("");

  /**
   * 取引履歴を取得
   */
  useEffect(() => {
    const userId = Cookies.get("userId");

    getCashTransactions(1).then((response) => {
      setTransactions(response.data);
    });
    getWallets(Number(userId)).then((response) => {
      console.log(response.data);
      setBalance(
        response.data.filter((wallet) => wallet.currencyType === "CASH")[0]
          .balance
      );
    });
  }, []);

  /**
   * 送信ボタンをクリックしたときの処理
   */
  const handleClickSubmit = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("有効な金額を入力してください。");
      return;
    }
    setError("");
    // 確認ダイアログを表示
    setIsConfirmOpen(true);
  };

  /**
   * 確認ダイアログで確認ボタンをクリックしたときの処理
   */
  const confirmTransaction = () => {
    const numAmount = Number(amount);
    console.log(numAmount);

    if (transactionType === "WITHDRAWAL") {
      cashWithdrawal(1, numAmount).then(() => {
        window.location.reload();
      });
    } else if (transactionType === "DEPOSIT") {
      cashDeposit(1, numAmount).then(() => {
        window.location.reload();
      });
    } else {
      setIsConfirmOpen(false);
      setError("入出金に失敗しました");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">入金・出金</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">現在の残高</h2>
        <p className="text-3xl font-bold text-blue-600">
          {balance.toLocaleString()}円
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">入金または出金</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2">金額 (円)</label>
          <input
            type="text"
            name="amount"
            defaultValue={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">取引タイプ</label>
          <select
            name="transactionType"
            defaultValue={transactionType}
            onChange={(e) =>
              setTransactionType(e.target.value as "DEPOSIT" | "WITHDRAWAL")
            }
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="DEPOSIT">入金</option>
            <option value="WITHDRAWAL">出金</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleClickSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          送信
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">取引履歴</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.transactionId}
              className="flex justify-between items-center border-b pb-2"
            >
              <div className="flex items-center">
                {transaction.transactionType === "DEPOSIT" ? (
                  <ArrowUpCircle className="text-green-500 mr-2" />
                ) : (
                  <ArrowDownCircle className="text-red-500 mr-2" />
                )}
                <div>
                  <p className="font-bold">
                    {transaction.amount.toLocaleString()}円
                  </p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
            <Dialog.Title className="text-lg font-bold">
              取引の確認
            </Dialog.Title>
            <Dialog.Description className="mt-2">
              {transactionType === "DEPOSIT"
                ? `この金額を入金しますか？: ${amount}円`
                : `この金額を出金しますか？: ${amount}円`}
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
                onClick={confirmTransaction}
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

export default DepositWithdraw;
