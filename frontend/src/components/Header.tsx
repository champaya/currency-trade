import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, QrCode } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="gradient-bg text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">LocalCoin</Link>
        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6" />
          <QrCode className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;