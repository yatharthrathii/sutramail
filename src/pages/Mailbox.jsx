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
  Archive,
  Trash2,
  CalendarCheck,
} from "lucide-react";
import ComposeMail from "../components/ComposeMail";
import Draft from "../components/Draft";
import Inbox from "../components/Inbox";
import Sent from "../components/Sent";
import Snoozed from "../components/Snoozed";
import Starred from "../components/Starred";
import Trash from "../components/Trash";
import Scheduled from "../components/Scheduled";
import Archives from "../components/Archives";
import { useState, useEffect, useRef } from "react";
import useMails from "../hooks/useMails";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import SettingsPage from "./SettingsPage";

const Mailbox = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Inbox");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { inbox, sent, trashed, starred, snoozed, draft, loading } = useMails();
  const [searchQuery, setSearchQuery] = useState("");

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowMoreOptions(false);
    setSearchQuery("");
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter mails only for current active tab
  const filterMails = (mails) => {
    if (!searchQuery) return mails;
    const q = searchQuery.toLowerCase();
    return mails.filter(
      (mail) =>
        mail.subject?.toLowerCase().includes(q) ||
        mail.body?.toLowerCase().includes(q) ||
        mail.from?.toLowerCase().includes(q) ||
        mail.to?.toLowerCase().includes(q)
    );
  };

  const renderMainContent = () => {
    if (loading) return <div className="p-6 text-center text-gray-500">Loading mails...</div>;

    switch (activeTab) {
      case "Inbox":
        return <Inbox inboxMails={filterMails(inbox)} />;
      case "Starred":
        return <Starred starredMails={filterMails(starred)} />;
      case "Snoozed":
        return <Snoozed snoozedMails={filterMails(snoozed)} />;
      case "Sent":
        return <Sent sentMails={filterMails(sent)} />;
      case "Draft":
        return <Draft draftMails={filterMails(draft)} />;
      case "Trash":
        return <Trash trashMails={filterMails(trashed)} />;
      case "Compose":
        return <ComposeMail />;
      case "Scheduled":
        return <Scheduled />;
      case "Archives":
        return <Archives />;
      default:
        return null;
    }
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <Settings onClick={() => navigate("/mailbox/setting")} className="hidden md:block text-gray-600 hover:text-emerald-600 cursor-pointer" />
          <div className="relative" ref={profileMenuRef}>
            <User
              className="text-gray-600 hover:text-emerald-600 cursor-pointer"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            />
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <button
                  onClick={() => navigate("/mailbox/manage-account")}
                  className="block w-full text-left px-4 py-2 cursor-pointer hover:bg-emerald-50 text-gray-700"
                >
                  Manage Account
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 cursor-pointer hover:bg-emerald-50 text-red-600"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
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
              className="bg-emerald-500 text-white font-semibold py-2 mb-6 flex items-center justify-center gap-2 rounded-lg w-full hover:bg-emerald-600 transition cursor-pointer"
            >
              <Pencil className="w-4 h-4" /> Compose
            </button>

            <nav className="space-y-2 text-sm">
              {[
                {
                  label: "Inbox",
                  icon: <InboxIcon className="w-4 h-4" />,
                  count: inbox.filter((mail) => !mail.read).length,
                },
                { label: "Starred", icon: <Star className="w-4 h-4" /> },
                { label: "Snoozed", icon: <Clock className="w-4 h-4" /> },
                { label: "Sent", icon: <Send className="w-4 h-4" /> },
                { label: "Draft", icon: <FileText className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleTabClick(item.label)}
                  className={`flex items-center cursor-pointer justify-between gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-emerald-100 transition ${activeTab === item.label ? "bg-emerald-100 text-emerald-700" : "text-gray-700"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.count > 0 && (
                    <span className="bg-emerald-100  text-emerald-700 text-xs font-medium px-2 py-0.5 rounded-full">
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
                    onClick={() => handleTabClick("Archives")}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-emerald-100 text-gray-700 transition cursor-pointer"
                  >
                    <Archive className="w-4 h-4" />
                    Archive
                  </button>
                  <button
                    onClick={() => handleTabClick("Scheduled")}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-emerald-100 text-gray-700 transition cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Scheduled
                  </button>
                  <button
                    onClick={() => handleTabClick("Trash")}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-emerald-100 text-gray-700 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    Trash
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
