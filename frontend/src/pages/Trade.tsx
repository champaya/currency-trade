import React, { useState } from 'react';
import { ArrowLeft, Bell } from 'lucide-react';
import Chart from '../components/Chart';

type TradeType = 'buy' | 'sell';

/**
 * 取引ページコンポーネント
 * 特定の暗号資産の取引インターフェースを提供する
 * @returns {JSX.Element} 取引ページコンポーネント
 */
const Trade: React.FC = () => {
  // 取引タイプ（買う/売る）の状態を管理
  const [tradeType, setTradeType] = useState<TradeType>('buy');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヘッダーセクション */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <ArrowLeft className="w-6 h-6" />
          <h2 className="text-xl font-semibold">BTC</h2>
          <p className="text-sm text-gray-500">ビットコイン</p>
        </div>
        <Bell className="w-6 h-6" />
      </div>
      {/* 現在の価格表示 */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold">5,352,637円</h3>
        <p className="text-green-500">+0.55%</p>
      </div>
      {/* チャートコンポーネント */}
      <Chart />
      {/* 取引セクション */}
      <div className="mt-8">
        {/* 取引タイプ選択ボタン */}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${tradeType === 'buy' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-l-full`}
            onClick={() => setTradeType('buy')}
          >
            買う
          </button>
          <button
            className={`flex-1 py-2 ${tradeType === 'sell' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-r-full`}
            onClick={() => setTradeType('sell')}
          >
            売る
          </button>
        </div>
        {/* 取引詳細カード */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500">現在価格</p>
            <p className="font-semibold">42,398円</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500">取引手数料</p>
            <p className="font-semibold">858円</p>
          </div>
          {/* 取引実行ボタン */}
          <button className="btn btn-primary w-full mt-4">
            {tradeType === 'buy' ? '買う' : '売る'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trade;