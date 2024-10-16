import React, { useState, FormEvent } from 'react';

/**
 * ログインページコンポーネント
 * ユーザーがアカウントにログインするためのフォームを提供する
 * @returns {JSX.Element} ログインページコンポーネント
 */
const Login: React.FC = () => {
  // フォームの状態を管理するステート
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /**
   * フォーム送信時の処理
   * @param {FormEvent<HTMLFormElement>} e - フォーム送信イベント
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: ログイン処理の実装
    console.log('Login attempt', { email, password });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* メールアドレス入力フィールド */}
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        {/* パスワード入力フィールド */}
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        {/* ログインボタン */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;