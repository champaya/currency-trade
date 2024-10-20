import React, { useEffect } from "react";
import AssetList from "../components/AssetList";
import Chart from "../components/Chart";

const Dashboard: React.FC = () => {
  useEffect(() => {
    // Fetch balance from API in a real application
    // For now, we'll use the initial state
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">保有コイン</h2>
      <AssetList />
      <Chart />
    </div>
  );
};

export default Dashboard;
