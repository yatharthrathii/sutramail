import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginWithEmail } from "../firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isValid = form.email.trim() !== "" && form.password.trim() !== "";

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await LoginWithEmail(form.email, form.password);

            if (response.idToken) {
                localStorage.setItem("sutramail-token", response.idToken);
                dispatch(login(response.email));
                navigate("/mailbox");
            } else {
                throw new Error(response.error?.message || "Login failed");
            }
        } catch (err) {
            console.log(err);
            setError("Invalid email or password. Please try again.");
        }
    };

    const handleGuestLogin = async () => {
        setError("");
        try {
            const response = await LoginWithEmail(
                "guest@sutramail.com",
                "123456"
            );
            if (response.idToken) {
                localStorage.setItem("sutramail-token", response.idToken);
                dispatch(login(response.email));
                navigate("/mailbox");
            } else {
                throw new Error(response.error?.message || "Guest login failed");
            }
        } catch (err) {
            console.error(err);
            setError("Guest login failed. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-teal-50 to-emerald-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:flex flex-col items-center justify-center p-10 bg-white">
                    <h1 className="text-4xl font-bold text-emerald-600 mb-4">SutraMail</h1>
                    <p className="text-gray-600 text-center max-w-xs">
                        Securely connect to your inbox with one click.
                    </p>
                </div>

                <div className="flex items-center justify-center p-8 bg-white">
                    <div className="w-full max-w-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            Login to SutraMail
                        </h2>

                        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
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
                                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
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
                            <button
                                type="submit"
                                disabled={!isValid}
                                className={`w-full py-2 font-semibold rounded-lg text-white transition ${isValid
                                    ? "bg-emerald-500 hover:bg-emerald-600"
                                    : "bg-emerald-300 cursor-not-allowed"}`}
                            >
                                Login
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={handleGuestLogin}
                            className="w-full py-2 font-semibold rounded-lg text-emerald-600 border border-emerald-500 hover:bg-emerald-50 transition mt-2"
                        >
                            Login as Guest
                        </button>

                        <p className="mt-6 text-sm text-center text-gray-500">
                            Don’t have an account?{' '}
                            <a href="/signup" className="text-emerald-600 hover:underline font-medium">
                                Create one
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;