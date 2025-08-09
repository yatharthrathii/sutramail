import { useState, useEffect } from "react";
import {
  getUserInfo,
  updateProfileInfo,
  updateUserPassword,
} from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const ManageAccount = () => {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState(
    localStorage.getItem("sutramail_user_email") || ""
  );
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const idToken = localStorage.getItem("sutramail-token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!idToken) {
        setMessage("User not logged in.");
        setLoading(false);
        return;
      }
      const data = await getUserInfo(idToken);
      if (data.users && data.users.length > 0) {
        const user = data.users[0];
        setDisplayName(user.displayName || "");
        setPhotoURL(user.photoUrl || "");
        setEmail(user.email || "");
      } else {
        setMessage("Failed to load user info.");
      }
      setLoading(false);
    };
    fetchUser();
  }, [idToken]);

  const handleUpdateProfile = async () => {
    if (!idToken) return;
    const res = await updateProfileInfo(idToken, displayName, photoURL);
    if (res.error) {
      setMessage(res.error.message);
    } else {
      setMessage("✅ Profile updated successfully!");
    }
  };

  const handleChangePassword = async () => {
    if (!idToken || !newPassword) return;
    const res = await updateUserPassword(idToken, newPassword);
    if (res.error) {
      setMessage(res.error.message);
    } else {
      setMessage("✅ Password updated successfully!");
      setNewPassword("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-extrabold text-emerald-700 mb-6">
        Manage Account
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg transition-all duration-300 hover:shadow-2xl">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-5">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-300 shadow"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-emerald-300"></div>
          )}
          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="mt-3 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Full Name */}
        <label className="block text-sm font-semibold mb-1 text-gray-600">
          Full Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        {/* Email */}
        <label className="block text-sm font-semibold mb-1 text-gray-600">
          Email
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full px-3 py-2 border rounded-lg mb-4 bg-gray-100 cursor-not-allowed"
        />

        <button
          onClick={handleUpdateProfile}
          className="w-full bg-emerald-500 text-white py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-colors mb-6"
        >
          Update Profile
        </button>

        {/* Change Password */}
        <label className="block text-sm font-semibold mb-1 text-gray-600">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleChangePassword}
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Change Password
        </button>

        {/* Message */}
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center text-sm ${
              message.startsWith("✅")
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-5 text-sm text-emerald-600 hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ManageAccount;
