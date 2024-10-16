import React, { useState } from 'react';

interface UserProfile {
  username: string;
  email: string;
  phoneNumber: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>({
    username: 'ユーザー名',
    email: 'user@example.com',
    phoneNumber: '090-1234-5678',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call an API to update the profile
    console.log('Updated profile:', profile);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">プロフィール</h1>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          {/* Form fields */}
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          {/* Profile display */}
        </div>
      )}
    </div>
  );
};

export default Profile;