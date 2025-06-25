import { useState } from "react";
import { SignUpWithEmail } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValid =
    form.email.trim() !== "" &&
    form.password.trim() !== "" &&
    form.confirmPassword.trim() !== "" &&
    form.password === form.confirmPassword;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await SignUpWithEmail(form.email, form.password);
      console.log("User has successfully signed up");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    setForm({ email: "", password: "", confirmPassword: "" })
    navigate("/mailbox");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-teal-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-white">
          <h1 className="text-4xl font-bold text-emerald-600 mb-4">SutraMail</h1>
          <p className="text-gray-600 text-center max-w-xs">
            Simple, secure and smart communication for your everyday needs.
          </p>
          {/* <img
            src="https://illustrations.popsy.co/white/mail.svg"
            alt="Mail Illustration"
            className="mt-6 w-64"
          /> */}
        </div>

        {/* Right Panel - Form */}
        <div className="flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>

            {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  placeholder="you@sutramail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`w-full px-4 py-2 rounded-lg border ${form.confirmPassword && form.password !== form.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-400 focus:outline-none`}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full py-2 font-semibold rounded-lg text-white transition ${isValid
                  ? "bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
                  : "bg-emerald-300 cursor-not-allowed"
                  }`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            {/* 🔐 Login Redirect Button */}
            <p className="mt-6 text-sm text-center text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-emerald-600 hover:underline font-medium transition"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
