import React, { useState, FormEvent } from 'react';

/**
 * 登録ページコンポーネント
 * 新規ユーザーがアカウントを作成するためのフォームを提供する
 * @returns {JSX.Element} 登録ページコンポーネント
 */
const Register: React.FC = () => {
  // フォームの状態を管理するステート
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /**
   * フォーム送信時の処理
   * @param {FormEvent<HTMLFormElement>} e - フォーム送信イベント
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 登録処理の実装
    console.log('Registration attempt', { username, email, password });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ユーザー名入力フィールド */}
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
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
        {/* 登録ボタン */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;