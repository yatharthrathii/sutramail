const FIREBASE_DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;

export const sendMail = async (mail) => {
    const res = await fetch(`${FIREBASE_DB_URL}/mails.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...mail,
            to: mail.to?.trim().toLowerCase(),
            from: mail.from?.trim().toLowerCase(),
        }),
    });
    return res;
};

export const fetchInboxMails = async (userEmail) => {
    const res = await fetch(`${FIREBASE_DB_URL}/mails.json`);
    const data = await res.json();

    const filtered = Object.values(data || {}).filter(
        (mail) =>
            mail.to?.trim().toLowerCase() === userEmail?.trim().toLowerCase()
    );

    return filtered;
};

export const fetchSentMails = async (userEmail) => {
    const res = await fetch(`${FIREBASE_DB_URL}/mails.json`);
    const data = await res.json();

    const filtered = Object.values(data || {}).filter(
        (mail) =>
            mail.from?.trim().toLowerCase() === userEmail?.trim().toLowerCase()
    );

    return filtered;
};
