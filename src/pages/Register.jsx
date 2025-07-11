import { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, NavLink, Link } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserPlusIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [err] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirm, setConfirm] = useState(null);

  const isFormValid = () =>
    name.trim() && pass && pass === confirmPass && accepted;

  const saveUserInfo = async (uid, fullName) => {
    const formatted =
      fullName.trim().charAt(0).toUpperCase() + fullName.trim().slice(1);
    await setDoc(doc(db, "users", uid), { name: formatted });
    localStorage.setItem("displayName", formatted);
  };

  const handleEmailRegister = async () => {
    if (!isFormValid()) {
      toast.error("❌ Please fill all fields correctly.");
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(res.user, { displayName: name });
      await saveUserInfo(res.user.uid, name);
      toast.success("✅ Registered successfully!");
      nav("/");
    } catch (e) {
      toast.error("❌ Registration failed.");
    }
  };

  const googleRegister = async () => {
    if (!accepted) {
      toast.error("❌ Accept Terms and Privacy first.");
      return;
    }
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());
      if (res.user.displayName)
        await saveUserInfo(res.user.uid, res.user.displayName);
      toast.success("✅ Google login successful!");
      nav("/");
    } catch {
      toast.error("❌ Google login failed.");
    }
  };

  const sendOtp = async () => {
    if (!name.trim()) return toast.error("❌ Name is required first!");
    try {
      window.recaptchaVerifier =
        window.recaptchaVerifier ||
        new RecaptchaVerifier("recaptcha", { size: "invisible" }, auth);
      const confirmation = await signInWithPhoneNumber(
        auth,
        "+91" + phone,
        window.recaptchaVerifier
      );
      setConfirm(confirmation);
      toast.success("✅ OTP sent!");
    } catch {
      toast.error("❌ Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (!isFormValid()) return toast.error("❌ Complete all fields first.");
    try {
      const res = await confirm.confirm(otp);
      await updateProfile(res.user, { displayName: name });
      await saveUserInfo(res.user.uid, name);
      toast.success("✅ Phone login successful!");
      nav("/");
    } catch {
      toast.error("❌ Wrong OTP");
    }
  };

  const Field = ({ icon: Icon, ...rest }) => (
    <div className="relative mb-3">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lime-400" />
      <input
        {...rest}
        className="w-full pl-10 pr-3 py-2 border rounded bg-gray-800 text-lime-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
      />
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4 py-8">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl text-lime-400 font-bold mb-6 text-center flex items-center justify-center gap-2">
          <UserPlusIcon className="w-8 h-8" /> Register
        </h1>

        {/* FULL NAME */}
        <Field
          icon={UserPlusIcon}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />

        {/* EMAIL & PASS */}
        <Field
          icon={EnvelopeIcon}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Field
          icon={LockClosedIcon}
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        />
        <Field
          icon={LockClosedIcon}
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Confirm Password"
        />

        {/* TERMS CHECKBOX */}
        <div className="flex items-start gap-3 mt-4 mb-5">
          <button
            onClick={() => setAccepted(!accepted)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center
            ${
              accepted
                ? "bg-lime-500 border-lime-500"
                : "bg-gray-800 border-gray-600"
            }
            hover:ring-2 hover:ring-lime-400`}>
            {accepted && (
              <svg
                className="w-3 h-3 text-gray-900"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <label htmlFor="acceptTerms" className="text-sm text-gray-300">
            I accept the{" "}
            <NavLink to="/terms" className="underline text-lime-400">
              Terms
            </NavLink>{" "}
            &{" "}
            <NavLink to="/privacy" className="underline text-lime-400">
              Privacy Policy
            </NavLink>
          </label>
        </div>

        {/* EMAIL REGISTER */}
        <button
          onClick={handleEmailRegister}
          className="w-full bg-lime-500 hover:bg-lime-600 text-gray-900 font-semibold py-2 rounded transition mb-5">
          Sign Up with Email
        </button>

        {/* SEPARATOR */}
        <div className="text-center text-gray-400 mb-3">
          ──────────── or ────────────
        </div>

        {/* GOOGLE */}
        <button
          onClick={googleRegister}
          className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-lime-100 border border-gray-700 py-2 rounded shadow hover:shadow-md transition mb-3">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* PHONE AUTH */}
        {!confirm ? (
          <>
            <Field
              icon={PhoneIcon}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (10 digits)"
            />
            <button
              onClick={sendOtp}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded transition">
              Continue with Phone
            </button>
          </>
        ) : (
          <>
            <Field
              icon={LockClosedIcon}
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2 rounded transition">
              Verify OTP
            </button>
          </>
        )}

        {/* Error Display */}
        {err && <p className="text-red-500 text-sm mt-3 text-center">{err}</p>}

        {/* Link to Login */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Already registered?{" "}
          <Link to="/login" className="underline hover:text-lime-300">
            Login
          </Link>
        </p>

        {/* Invisible reCAPTCHA */}
        <div id="recaptcha" />
      </div>
    </div>
  );
}
