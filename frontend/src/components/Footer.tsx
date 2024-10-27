import React from "react";
import { Home, BarChart2, Wallet, User, Banknote } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-2">
        <nav className="flex justify-between items-center">
          <Link
            to="/"
            className="flex flex-col items-center text-gray-600 hover:text-blue-600"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">ホーム</span>
          </Link>
          <Link
            to="/trade"
            className="flex flex-col items-center text-gray-600 hover:text-blue-600"
          >
            <BarChart2 className="w-6 h-6" />
            <span className="text-xs mt-1">取引</span>
          </Link>
          <Link
            to="/convert"
            className="flex flex-col items-center text-gray-600 hover:text-blue-600"
          >
            <Banknote className="w-6 h-6" />
            <span className="text-xs mt-1">変換</span>
          </Link>
          <Link
            to="/deposit-withdraw"
            className="flex flex-col items-center text-gray-600 hover:text-blue-600"
          >
            <Wallet className="w-6 h-6" />
            <span className="text-xs mt-1">入出金</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center text-gray-600 hover:text-blue-600"
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">プロフィール</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
