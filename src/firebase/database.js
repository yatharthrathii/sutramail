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

    const data = await res.json();
    return { ok: res.ok, id: data.name };
};

export const fetchInboxMails = async (userEmail) => {
    const res = await fetch(`${FIREBASE_DB_URL}/mails.json`);
    const data = await res.json();

    const filtered = Object.entries(data || {})
        .map(([id, mail]) => ({ id, ...mail }))
        .filter(mail => mail.to === userEmail && !mail.deleted);

    return filtered;
};

export const fetchSentMails = async (userEmail) => {
    const res = await fetch(`${FIREBASE_DB_URL}/mails.json`);
    const data = await res.json();

    const filtered = Object.entries(data || {})
        .map(([id, mail]) => ({ id, ...mail }))
        .filter(mail => mail.from?.trim().toLowerCase() === userEmail?.trim().toLowerCase() && !mail.deleted);

    return filtered;
};

export const deleteMail = async (id) => {
    const res = await fetch(`${FIREBASE_DB_URL}/mails/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleted: true }),
    });
    return res.ok;
};

export const restoreMail = async (id) => {
    const res = await fetch(`${FIREBASE_DB_URL}/mails/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleted: false }),
    });
    return res.ok;
};

export const fetchTrashedMails = async (userEmail) => {
    const res = await fetch(`${FIREBASE_DB_URL}/mails.json`);
    const data = await res.json();

    const trashed = Object.entries(data || {})
        .map(([id, mail]) => ({ id, ...mail }))
        .filter(mail => mail.deleted && (mail.to === userEmail || mail.from === userEmail));

    return trashed;
};

export const permanentlyDeleteMails = async (ids) => {
    const deletePromises = ids.map(id =>
        fetch(`${FIREBASE_DB_URL}/mails/${id}.json`, { method: "DELETE" })
    );
    await Promise.all(deletePromises);
};