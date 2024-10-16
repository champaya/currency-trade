import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import CoinList from './pages/CoinList';
import CoinTrade from './pages/CoinTrade';
import DepositWithdraw from './pages/DepositWithdraw';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trade" element={<CoinList />} />
            <Route path="/trade/:coinId" element={<CoinTrade />} />
            <Route path="/deposit-withdraw" element={<DepositWithdraw />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;