import React, { useState } from "react";
import { register } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

/**
 * サインアップページコンポーネント
 * 新規ユーザー登録フォームを提供する
 * @returns {JSX.Element} サインアップページコンポーネント
 */
const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    passwordHash: "",
  });

  const navigate = useNavigate(); // サインアップ成功後のリダイレクト用

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    const result = await register(
      signUpForm.username,
      signUpForm.email,
      signUpForm.passwordHash
    );
    if (result.status === 201) {
      navigate("/login"); // サインアップ成功後にログインページにリダイレクト
    } else {
      console.error("Sign up failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">新規登録</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            ユーザー名
          </label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={signUpForm.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={signUpForm.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="passwordHash" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="passwordHash"
            name="passwordHash"
            defaultValue={signUpForm.passwordHash}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          onClick={handleSignUp}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          登録
        </button>
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            すでにアカウントをお持ちですか？ログインはこちら
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
