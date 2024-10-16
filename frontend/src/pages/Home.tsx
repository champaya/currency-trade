import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ホームページコンポーネント
 * アプリケーションのランディングページを表示する
 * @returns {JSX.Element} ホームページコンポーネント
 */
const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to LocalCoin</h1>
      <p className="text-xl mb-8">Trade Japanese local currencies with ease</p>
      {/* 登録とログインボタン */}
      <div className="space-x-4">
        <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Register</Link>
        <Link to="/login" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300">Login</Link>
      </div>
    </div>
  );
};

export default Home;