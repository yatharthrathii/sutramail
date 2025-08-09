const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

// Sign Up
export const SignUpWithEmail = async (email, password) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
    );
    return res.json();
};

// Login
export const LoginWithEmail = async (email, password) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
    );
    return res.json();
};

// Send Password Reset Email
export const sendPasswordReset = async (email) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email,
            })
        }
    );
    return res.json();
};

// 🔹 Get User Info
export const getUserInfo = async (idToken) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
        }
    );
    return res.json();
};

// 🔹 Update Profile (name & photo)
export const updateProfileInfo = async (idToken, displayName, photoURL) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idToken,
                displayName,
                photoUrl: photoURL,
                returnSecureToken: true,
            }),
        }
    );
    return res.json();
};

// 🔹 Change Password
export const updateUserPassword = async (idToken, newPassword) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idToken,
                password: newPassword,
                returnSecureToken: true,
            }),
        }
    );
    return res.json();
};

// 🔹 Change Email
export const updateUserEmail = async (idToken, newEmail) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idToken,
                email: newEmail,
                returnSecureToken: true,
            }),
        }
    );
    return res.json();
};
