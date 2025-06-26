import { useEffect, useState } from "react";
import { fetchInboxMails, fetchSentMails } from "../firebase/database";
import { useSelector } from "react-redux";

const useMails = () => {
    const userEmail = useSelector((state) => state.user.email);
    const [inbox, setInbox] = useState([]);
    const [sent, setSent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userEmail) return;

        const fetchMails = async () => {
            const inboxMails = await fetchInboxMails(userEmail);
            const sentMails = await fetchSentMails(userEmail);
            setInbox(inboxMails);
            setSent(sentMails);
            setLoading(false);
        };

        fetchMails();

        const interval = setInterval(fetchMails, 2000);
        return () => clearInterval(interval);
    }, [userEmail]);

    return { inbox, sent, loading };
};

export default useMails;