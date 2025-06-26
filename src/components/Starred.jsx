import { useEffect, useState } from "react";
import { fetchInboxMails } from "../firebase/database";
import { useSelector } from "react-redux";
import MailList from "./MailList";

const Starred = () => {
    const [starredMails, setStarredMails] = useState([]);
    const userEmail = useSelector((state) => state.user.email);

    useEffect(() => {
        const loadStarredMails = async () => {
            const inboxMails = await fetchInboxMails(userEmail);
            const starredIds = JSON.parse(localStorage.getItem("starredMails")) || [];

            const filtered = inboxMails.filter(mail => starredIds.includes(mail.id));
            setStarredMails(filtered);
        };

        if (userEmail) loadStarredMails();
    }, [userEmail]);

    return (
        <div className="p-4">
            <MailList title="Starred Mails" mails={starredMails} />
        </div>
    );
};

export default Starred;
