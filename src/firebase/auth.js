const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

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
}

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
    )
    return res.json();
}