import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";


const Field = ({ icon: Icon, onKeyDown, ...rest }) => (
  <div className="relative mb-3">
    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lime-400 pointer-events-none" />
    <input
      {...rest}
      onKeyDown={onKeyDown}
      className="w-full pl-10 pr-3 py-2 border rounded bg-gray-800 text-lime-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
    />
  </div>
);

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [err, setErr] = useState("");
  const [accepted, setAccepted] = useState(false);


  const emailLogin = async () => {
    if (!accepted) {
      toast.error("❌ Please accept the Terms and Privacy Policy.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      toast.success("✅ Logged in successfully!");
      nav("/");
    } catch {
      setErr("❌ Invalid email/password");
    }
  };
  

  const googleLogin = async () => {
    if (!accepted) {
      toast.error("❌ Please accept the Terms and Privacy Policy.");
      return;
    }
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      toast.success("✅ Google login successful!");
      nav("/");
    } catch {
      setErr("❌ Google login failed");
    }
  };
  

  const sendOtp = async () => {
    setErr("");
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
      alert("✅ OTP sent!");
    } catch {
      setErr("❌ Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (!accepted) {
      toast.error("❌ Please accept the Terms and Privacy Policy.");
      return;
    }
    try {
      await confirm.confirm(otp);
      toast.success("✅ Phone login successful!");
      nav("/");
    } catch {
      setErr("❌ Wrong OTP");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4 py-8">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl text-lime-400 font-bold mb-6 text-center flex items-center justify-center gap-2">
          <ShieldCheckIcon className="w-8 h-8" /> Login
        </h1>

        {/* Email & Password */}
        <Field
          icon={EnvelopeIcon}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          onKeyDown={(e) => e.key === "Enter" && emailLogin()}
        />
        <Field
          icon={LockClosedIcon}
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          onKeyDown={(e) => e.key === "Enter" && emailLogin()}
        />

        <button
          onClick={emailLogin}
          className="w-full flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-gray-900 font-semibold py-2 rounded transition mb-3">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Login with Email
        </button>
        <p className="text-sm text-gray-400 text-center mb-5">
          or continue with
        </p>
        {/* Google Auth */}
        <button
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-lime-100 border border-gray-700 py-2 rounded shadow hover:shadow-md transition mb-5">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
        <p className="text-sm text-gray-400 text-center mb-5">
          or use your phone number
        </p>
        {/* Phone Auth */}
        {!confirm ? (
          <>
            <Field
              icon={PhoneIcon}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (10 digits)"
              onKeyDown={(e) => e.key === "Enter" && sendOtp()}
            />
            <button
              onClick={sendOtp}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded transition">
              Send OTP
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
              onKeyDown={(e) => e.key === "Enter" && verifyOtp()}
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2 rounded transition">
              Verify OTP
            </button>
          </>
        )}

        {/* Error */}
        {err && <p className="text-red-500 text-sm mt-3 text-center">{err}</p>}

        {/* Link to Register */}
        <p className="text-xs text-gray-400 text-center mt-6">
          No account?{" "}
          <Link to="/register" className="underline hover:text-lime-300">
            Register
          </Link>
        </p>
        <div className="flex items-start gap-3 mt-4">
          <button
            onClick={() => setAccepted((prev) => !prev)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition
      ${
        accepted ? "bg-lime-500 border-lime-500" : "bg-gray-800 border-gray-600"
      }
      hover:ring-2 hover:ring-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400`}
            aria-label="Accept terms">
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
            <NavLink
              to="/terms"
              className="underline text-lime-400 hover:text-lime-300">
              Terms
            </NavLink>{" "}
            &{" "}
            <NavLink
              to="/privacy"
              className="underline text-lime-400 hover:text-lime-300">
              Privacy Policy
            </NavLink>
          </label>
        </div>

        {/* Invisible reCAPTCHA container */}
        {/* <div id="recaptcha" /> */}
      </div>
    </div>
  );
}
