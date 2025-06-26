import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Star, StarOff, Trash2 } from "lucide-react";
import { deleteMail as deleteFromFirebase } from "../firebase/database";
import { useNavigate } from "react-router-dom";

const MailList = ({ title, mails }) => {
    const [starredMails, setStarredMails] = useState([]);
    const [readMails, setReadMails] = useState([]);
    const [selectedMails, setSelectedMails] = useState([]);
    const [visibleMails, setVisibleMails] = useState(mails);

    const navigate = useNavigate();

    useEffect(() => {
        const storedStarred = JSON.parse(localStorage.getItem("starredMails")) || [];
        const storedRead = JSON.parse(localStorage.getItem("readMails")) || [];
        setStarredMails(storedStarred);
        setReadMails(storedRead);
        setVisibleMails(mails);
    }, [mails]);

    const toggleStar = (id) => {
        const updatedStars = starredMails.includes(id)
            ? starredMails.filter((mailId) => mailId !== id)
            : [...starredMails, id];

        setStarredMails(updatedStars);
        localStorage.setItem("starredMails", JSON.stringify(updatedStars));
    };

    const markAsRead = (id) => {
        if (!readMails.includes(id)) {
            const updatedRead = [...readMails, id];
            setReadMails(updatedRead);
            localStorage.setItem("readMails", JSON.stringify(updatedRead));
        }
    };

    const toggleSelect = (id) => {
        const updatedSelected = selectedMails.includes(id)
            ? selectedMails.filter((mailId) => mailId !== id)
            : [...selectedMails, id];

        setSelectedMails(updatedSelected);
    };

    const deleteMail = async (id) => {
        await deleteFromFirebase(id); // Marks as deleted in Firebase

        const updatedList = visibleMails.filter(mail => mail.id !== id);
        setVisibleMails(updatedList);

        const newStarred = starredMails.filter(mid => mid !== id);
        const newRead = readMails.filter(mid => mid !== id);
        const newSelected = selectedMails.filter(mid => mid !== id);

        setStarredMails(newStarred);
        setReadMails(newRead);
        setSelectedMails(newSelected);

        localStorage.setItem("starredMails", JSON.stringify(newStarred));
        localStorage.setItem("readMails", JSON.stringify(newRead));
    };

    return (
        <div className="p-4 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4 text-emerald-700">{title}</h2>

            {visibleMails.length === 0 ? (
                <p className="text-gray-500 text-sm">No mails found.</p>
            ) : (
                <ul className="space-y-3">
                    {visibleMails.map((mail) => {
                        const isStarred = starredMails.includes(mail.id);
                        const isRead = readMails.includes(mail.id);
                        const isSelected = selectedMails.includes(mail.id);

                        return (
                            <li
                                key={mail.id}
                                onClick={() => {
                                    markAsRead(mail.id);
                                    navigate(`/mail/${mail.id}`);
                                }}
                                className={`p-4 rounded-xl border border-gray-200 hover:border-emerald-400 hover:shadow transition cursor-pointer ${!isRead ? "bg-emerald-50" : "bg-white"}`}
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            className="mt-1 self-center"
                                            checked={isSelected}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggleSelect(mail.id);
                                            }}
                                        />

                                        <button
                                            className="text-gray-400 self-center hover:text-red-500 mt-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteMail(mail.id);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 mb-1">
                                                <strong>From:</strong> {mail.from}
                                            </p>
                                            <p className={`text-sm font-medium ${!isRead ? "text-emerald-800 font-bold" : "text-gray-800"} line-clamp-1`}>
                                                {mail.subject || "(No Subject)"}
                                            </p>
                                            <div
                                                className="text-xs text-gray-600 mt-1 line-clamp-2"
                                                dangerouslySetInnerHTML={{ __html: mail.body }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleStar(mail.id);
                                            }}
                                        >
                                            {isStarred ? (
                                                <Star className="w-4 h-4 text-yellow-500" />
                                            ) : (
                                                <StarOff className="w-4 h-4 text-gray-400 hover:text-yellow-500" />
                                            )}
                                        </button>

                                        {mail.timestamp && (
                                            <p className="text-xs text-gray-400 whitespace-nowrap">
                                                {formatDistanceToNow(mail.timestamp, { addSuffix: true })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default MailList;
