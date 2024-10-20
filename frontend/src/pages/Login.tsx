import React, { useState } from "react";
import { login } from "../services/api";
import { Link, useNavigate } from "react-router-dom"; // リンクのためにreact-router-domを追加
import Cookies from "js-cookie";

/**
 * ログインページコンポーネント
 * ユーザーがアカウントにログインするためのフォームを提供する
 * @returns {JSX.Element} ログインページコンポーネント
 */
const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    login(loginForm.email, loginForm.password)
      .then((response) => {
        Cookies.set("userId", response.data.userId.toString(), {
          expires: 1,
        });
        navigate("/");
      })
      .catch(() => {
        setErrorMessage("ログインに失敗しました。");
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">ログイン</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={loginForm.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            defaultValue={loginForm.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          onClick={handleClick}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          ログイン
        </button>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="text-center mt-4">
          <Link to="/signup" className="text-blue-600 hover:underline">
            登録はこちら
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
