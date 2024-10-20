import React, { useEffect, useState } from "react";
import { getUser, updateUser, User, withdrawal } from "../services/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<User>({
    userId: -1,
    username: "",
    email: "",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // モーダルの状態
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get("userId");

    getUser(Number.parseInt(userId ?? "-1"))
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  /**
   * プロフィール更新時の入力変更
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  /**
   * プロフィール更新
   */
  const handleUpdateAccount = () => {
    console.log(profile);
    updateUser(profile.userId, profile).then((response) => {
      setIsEditing(false);
      setProfile(response.data);
    });
  };

  /**
   * 退会
   */
  const handleDeleteAccount = () => {
    withdrawal(profile.userId).then(() => {
      Cookies.remove("userId");
      navigate("/login");
    });
  };

  const openModal = () => {
    setIsModalOpen(true); // モーダルを開く
  };

  const closeModal = () => {
    setIsModalOpen(false); // モーダルを閉じる
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">プロフィール</h1>

      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          {/* 編集フォームフィールド */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              ユーザー名
            </label>
            <input
              type="text"
              name="username"
              defaultValue={profile.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={profile.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            onClick={handleUpdateAccount}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            更新
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white py-2 px-4 ml-4 rounded-lg hover:bg-gray-600"
          >
            キャンセル
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="mb-4">ユーザー名: {profile.username}</p>
          <p className="mb-4">Email: {profile.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            編集
          </button>
          <button
            onClick={openModal}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 ml-4"
          >
            退会
          </button>
        </div>
      )}

      {/* 退会確認モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">退会確認</h2>
            <p className="mb-4">本当に退会しますか？</p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-4"
              >
                キャンセル
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                退会
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
