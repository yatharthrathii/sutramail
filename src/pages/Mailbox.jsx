import { useEffect, useState } from "react";
import { fetchInboxMails, fetchSentMails } from "../firebase/database";
import {
  Menu,
  Inbox as InboxIcon,
  Star,
  Clock,
  Send,
  FileText,
  MoreHorizontal,
  Settings,
  User,
  Pencil,
} from "lucide-react";
import ComposeMail from "../components/ComposeMail";
import Draft from "../components/Draft";
import Inbox from "../components/Inbox";
import Sent from "../components/Sent";
import Snoozed from "../components/Snoozed";
import Starred from "../components/Starred";
import Trash from "../components/Trash";
import { useSelector } from "react-redux";

const Mailbox = () => {
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Inbox");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userEmail = useSelector((state) => state.user.email);

  useEffect(() => {
    if (!userEmail) return;

    let pollingInterval;

    const fetchMails = async () => {
      const inboxMails = await fetchInboxMails(userEmail);
      const sentMails = await fetchSentMails(userEmail);

      setInbox((prevInbox) => {
        const oldIds = prevInbox.map((m) => m.id).sort().join(",");
        const newIds = inboxMails.map((m) => m.id).sort().join(",");
        return oldIds !== newIds ? inboxMails : prevInbox;
      });

      setSent(sentMails);
      setIsLoading(false);
    };

    fetchMails();
    pollingInterval = setInterval(fetchMails, 2000);

    return () => clearInterval(pollingInterval);
  }, [userEmail]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowMoreOptions(false);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const renderMainContent = () => {
    if (isLoading) return <div className="p-6 text-center text-gray-500">Loading mails...</div>;

    switch (activeTab) {
      case "Inbox":
        return <Inbox inboxMails={inbox} />;
      case "Starred":
        return <Starred />;
      case "Snoozed":
        return <Snoozed />;
      case "Sent":
        return <Sent />;
      case "Draft":
        return <Draft />;
      case "Trash":
        return <Trash />;
      case "Compose":
        return <ComposeMail senderEmail={userEmail} />;
      default:
        return null;
    }
  };

  if (!userEmail) {
    return <div className="p-6 text-gray-600 text-center">Redirecting to login...</div>;
  }

  const unreadCount = inbox.filter((mail) => !mail.read).length;

  return (
    <div className="min-h-screen bg-emerald-50">
      <header className="bg-white shadow flex items-center justify-between px-4 py-3 sticky top-0 z-20 w-full">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu className="w-6 h-6 text-emerald-600" />
          </button>
          <h2 className="hidden md:block text-lg font-bold text-emerald-600">SutraMail</h2>
        </div>

        <div className="flex-grow max-w-lg mx-4">
          <input
            type="text"
            placeholder="Search mail..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <Settings className="hidden md:block text-gray-600 hover:text-emerald-600 cursor-pointer" />
          <User className="text-gray-600 hover:text-emerald-600 cursor-pointer" />
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        <aside
          className={`fixed md:static top-16 left-0 z-10 bg-white shadow-lg w-64 h-[calc(100vh-64px)] transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">
            <button
              onClick={() => handleTabClick("Compose")}
              className="bg-emerald-500 text-white font-semibold py-2 mb-6 flex items-center justify-center gap-2 rounded-lg w-full hover:bg-emerald-600 transition"
            >
              <Pencil className="w-4 h-4" /> Compose
            </button>

            <nav className="space-y-2 text-sm">
              {[
                { label: "Inbox", icon: <InboxIcon className="w-4 h-4" />, count: unreadCount },
                { label: "Starred", icon: <Star className="w-4 h-4" /> },
                { label: "Snoozed", icon: <Clock className="w-4 h-4" /> },
                { label: "Sent", icon: <Send className="w-4 h-4" /> },
                { label: "Draft", icon: <FileText className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleTabClick(item.label)}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-emerald-100 transition ${activeTab === item.label
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-700"
                    }`}
                >
                  {item.icon}
                  {item.label}
                  {item.count > 0 && (
                    <span className="ml-auto text-xs text-emerald-600 font-semibold">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}

              <div className="relative">
                <button
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="flex items-center justify-between gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-emerald-100 text-gray-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <MoreHorizontal className="w-4 h-4" />
                    {showMoreOptions ? "Less" : "More"}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${showMoreOptions ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <button
                    onClick={() => handleTabClick("Trash")}
                    className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-emerald-100 text-gray-700 transition"
                  >
                    🗑 Trash
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-4 overflow-auto transition-all duration-300 ease-in-out">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Mailbox;
