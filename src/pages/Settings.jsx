import { useState } from "react";
import { auth } from "../firebase";
import { sendEmailVerification, updatePassword } from "firebase/auth";
import { toast } from "react-hot-toast";

export default function Settings() {
  const [password, setPassword] = useState("");

  const sendVerification = async () => {
    if (!auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser);
      toast.success("📧 Verification email sent!");
    } else {
      toast("✅ Email already verified.");
    }
  };

  const handleChangePassword = async () => {
    if (password.length < 6) return toast.error("Password too short!");
    await updatePassword(auth.currentUser, password);
    toast.success("🔐 Password updated!");
    setPassword("");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-950 text-lime-100">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-lime-400">⚙️ Settings</h2>

        <button
          onClick={sendVerification}
          className="bg-lime-500 hover:bg-lime-600 text-gray-900 px-4 py-2 rounded font-semibold w-full">
          Send Verification Email
        </button>

        <div>
          <label className="block mb-1 text-sm">🔐 New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-lime-400 rounded"
          />
        </div>

        <button
          onClick={handleChangePassword}
          className="bg-lime-500 hover:bg-lime-600 text-gray-900 px-4 py-2 rounded font-semibold w-full">
          Update Password
        </button>
      </div>
    </div>
  );
}
