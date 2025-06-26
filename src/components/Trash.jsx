import { useEffect, useState } from "react";
import { fetchTrashedMails, permanentlyDeleteMails, restoreMail } from "../firebase/database";
import { useSelector } from "react-redux";

const Trash = () => {
  const userEmail = useSelector((state) => state.user.email);
  const [trashedMails, setTrashedMails] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const loadTrash = async () => {
    if (!userEmail) return;
    const mails = await fetchTrashedMails(userEmail);
    setTrashedMails(mails);
  };

  useEffect(() => {
    loadTrash();
  }, [userEmail]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleEmptyTrash = async () => {
    await permanentlyDeleteMails(trashedMails.map((mail) => mail.id));
    setTrashedMails([]);
    setSelectedIds([]);
  };

  const handleRestore = async () => {
    for (const id of selectedIds) {
      await restoreMail(id);
    }
    await loadTrash();
    setSelectedIds([]);
  };

  return (
    <div className="p-4 text-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Trash</h2>
        {trashedMails.length > 0 && (
          <button
            onClick={handleEmptyTrash}
            className="text-sm text-red-500 hover:underline"
          >
            Empty Trash
          </button>
        )}
      </div>

      {trashedMails.length === 0 ? (
        <p>No deleted mails yet.</p>
      ) : (
        <div className="space-y-3">
          {trashedMails.map((mail) => (
            <div
              key={mail.id}
              className="p-4 border rounded-xl flex items-start gap-4"
            >
              <input
                type="checkbox"
                className="self-center"
                checked={selectedIds.includes(mail.id)}
                onChange={() => toggleSelect(mail.id)}
              />
              <div className="flex-1">
                <p className="text-xs text-gray-500">
                  <strong>From:</strong> {mail.from}
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {mail.subject || "(No Subject)"}
                </p>
                <div
                  className="text-xs text-gray-600 mt-1"
                  dangerouslySetInnerHTML={{ __html: mail.body }}
                />
              </div>
            </div>
          ))}

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleRestore}
              disabled={selectedIds.length === 0}
              className="px-4 py-2 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
            >
              Restore Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trash;