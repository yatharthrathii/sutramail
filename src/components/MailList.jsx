import { formatDistanceToNow } from "date-fns";

const MailList = ({ title, mails }) => {
    return (
        <div className="p-4 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4 text-emerald-700">{title}</h2>

            {mails.length === 0 ? (
                <p className="text-gray-500 text-sm">No mails found.</p>
            ) : (
                <ul className="space-y-4">
                    {mails.map((mail, i) => (
                        <li
                            key={i}
                            className="p-4 rounded-xl border border-gray-200 hover:border-emerald-400 hover:shadow-md transition cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        <strong>From:</strong> {mail.from}
                                    </p>
                                    <p className="text-md font-medium text-gray-800">
                                        {mail.subject}
                                    </p>
                                </div>
                                {mail.timestamp && (
                                    <p className="text-xs text-gray-500">
                                        {formatDistanceToNow(mail.timestamp, { addSuffix: true })}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MailList;
