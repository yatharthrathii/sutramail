import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
    const navigate = useNavigate();

    // States
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [autoSave, setAutoSave] = useState(false);
    const [language, setLanguage] = useState("en");
    const [profilePublic, setProfilePublic] = useState(true);
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [theme, setTheme] = useState("system");
    const [fontSize, setFontSize] = useState("medium");

    const resetDefaults = () => {
        setDarkMode(false);
        setNotifications(true);
        setAutoSave(false);
        setLanguage("en");
        setProfilePublic(true);
        setEmailAlerts(true);
        setTheme("system");
        setFontSize("medium");
    };

    return (
        <div className="min-h-screen bg-emerald-50 p-4 sm:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
                    Settings
                </h1>
                <button
                    onClick={() => navigate("/")}
                    className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white px-4 py-2 rounded-lg shadow transition"
                >
                    Back to Home
                </button>
            </div>

            {/* Settings Container */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-8 border border-emerald-200">

                {/* Section: Display */}
                <div>
                    <h2 className="text-xl font-semibold text-emerald-700 mb-4">Display</h2>

                    {/* Dark Mode */}
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-emerald-800">Dark Mode</span>
                        <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    </div>

                    {/* Theme Selector */}
                    <div className="mt-4">
                        <span className="text-lg font-medium mb-2 block text-emerald-800">Theme</span>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="border border-emerald-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 w-full"
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">System Default</option>
                        </select>
                    </div>

                    {/* Font Size */}
                    <div className="mt-4">
                        <span className="text-lg font-medium mb-2 block text-emerald-800">Font Size</span>
                        <select
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                            className="border border-emerald-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 w-full"
                        >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                </div>

                {/* Section: Account */}
                <div>
                    <h2 className="text-xl font-semibold text-emerald-700 mb-4">Account</h2>

                    {/* Profile Public */}
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-emerald-800">Profile Public</span>
                        <Toggle checked={profilePublic} onChange={() => setProfilePublic(!profilePublic)} />
                    </div>

                    {/* Language */}
                    <div className="mt-4">
                        <span className="text-lg font-medium mb-2 block text-emerald-800">Language</span>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="border border-emerald-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 w-full"
                        >
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="fr">French</option>
                            <option value="es">Spanish</option>
                        </select>
                    </div>
                </div>

                {/* Section: Notifications */}
                <div>
                    <h2 className="text-xl font-semibold text-emerald-700 mb-4">Notifications</h2>

                    {/* Enable Notifications */}
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-emerald-800">Enable Notifications</span>
                        <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} />
                    </div>

                    {/* Email Alerts */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-medium text-emerald-800">Email Alerts</span>
                        <Toggle checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
                    </div>
                </div>

                {/* Section: Auto Save */}
                <div>
                    <h2 className="text-xl font-semibold text-emerald-700 mb-4">Data</h2>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-emerald-800">Auto Save</span>
                        <Toggle checked={autoSave} onChange={() => setAutoSave(!autoSave)} />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-4 border-t border-emerald-200">
                    <button
                        onClick={resetDefaults}
                        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-5 py-2 rounded-lg shadow transition"
                    >
                        Reset Defaults
                    </button>
                    <button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white px-5 py-2 rounded-lg shadow transition">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

function Toggle({ checked, onChange }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-emerald-500 transition"></div>
            <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition ${checked ? "translate-x-5" : ""
                    }`}
            ></div>
        </label>
    );
}
