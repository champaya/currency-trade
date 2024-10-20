import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import Cookies from "js-cookie";
const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("userId");
    navigate("/login");
  };

  return (
    <header className="gradient-bg text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          地域通貨
        </Link>
        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6" />
          <LogOut className="w-6 h-6" onClick={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
