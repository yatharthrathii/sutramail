import { useEffect, useState } from "react";
import { fetchSentMails } from "../firebase/database";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const Sent = () => {
    const [sentMails, setSentMails] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = useSelector((state) => state.user.email);
    const navigate = useNavigate();

    useEffect(() => {
        const loadSentMails = async () => {
            const mails = await fetchSentMails(userEmail);
            setSentMails(mails);
            setLoading(false);
        };
        loadSentMails();
    }, [userEmail]);

    if (loading) return <p className="p-4">Loading sent mails...</p>;

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg mt-4 ml-2">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">Sent Mails</h2>
            {sentMails.length === 0 ? (
                <p className="text-gray-500 text-sm">No mails sent yet.</p>
            ) : (
                <ul className="space-y-4">
                    {sentMails.map((mail) => (
                        <li
                            key={mail.id}
                            onClick={() => navigate(`/mail/${mail.id}`)}
                            className="p-4 border border-gray-200 rounded-xl hover:shadow transition cursor-pointer"
                        >
                            <p className="text-sm text-gray-500 mb-1">
                                <strong>To:</strong> {mail.to}
                            </p>
                            <p className="font-medium text-gray-800 line-clamp-1">
                                {mail.subject || "(No Subject)"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {formatDistanceToNow(mail.timestamp, { addSuffix: true })}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Sent;
