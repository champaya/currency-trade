import React, { useState, useEffect } from "react";
import { getWallets, Wallet } from "../services/api";
import Cookies from "js-cookie";
import { DollarSign } from "lucide-react";

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<Wallet[]>([]);

  useEffect(() => {
    const userId = Cookies.get("userId");

    getWallets(Number(userId)).then((response) => {
      setAssets(response.data.filter((asset) => asset.currencyType !== "CASH"));
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">保有資産</h2>
        <div className="space-y-4">
          {assets.map((asset) => (
            <>
              <div className="flex items-center mb-2">
                <DollarSign className="text-green-500 mr-2" />
                <h2 className="text-lg font-bold">{asset.localCurrencyName}</h2>
              </div>
              <p className="text-gray-600">
                残高: {asset.balance.toLocaleString()}
              </p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetList;
