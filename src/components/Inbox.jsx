import { useState } from "react";
import MailList from "./MailList";
import {
    Inbox as InboxIcon,
    Users,
    RefreshCcw,
    Megaphone,
} from "lucide-react";

const Inbox = ({ inboxMails }) => {
    const [activeTab, setActiveTab] = useState("Primary");

    const tabs = [
        { name: "Primary", icon: <InboxIcon className="w-4 h-4" /> },
        { name: "Social", icon: <Users className="w-4 h-4" /> },
        { name: "Updates", icon: <RefreshCcw className="w-4 h-4" /> },
        { name: "Promotions", icon: <Megaphone className="w-4 h-4" /> },
    ];

    const filteredMails = inboxMails;

    return (
        <div className="transition-all duration-300">
            <h1 className="text-2xl font-bold text-emerald-700 mb-4">Inbox</h1>

            <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-300 pb-2 mb-6 text-sm font-medium overflow-x-auto">
                {tabs.map(({ name, icon }) => (
                    <button
                        key={name}
                        onClick={() => setActiveTab(name)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-200 ${activeTab === name
                                ? "bg-emerald-100 text-emerald-700 font-semibold shadow"
                                : "text-gray-600 hover:bg-emerald-50"
                            }`}
                    >
                        {icon} {name}
                    </button>
                ))}
            </div>

            <div className="animate-fade-in">
                <MailList title={`${activeTab}`} mails={filteredMails} />
            </div>
        </div>
    );
};

export default Inbox;
