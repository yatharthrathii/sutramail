import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMailById, markMailAsRead } from "../firebase/database";
import { ArrowLeft } from "lucide-react";

const MailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mail, setMail] = useState(null);

  useEffect(() => {
    const loadMail = async () => {
      const data = await fetchMailById(id);
      setMail(data);
      if (!data.read) {
        await markMailAsRead(id);
      }
    };
    loadMail();
  }, [id]);

  if (!mail) return <p className="p-4">Loading mail...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto ">
      {/* Top bar with back button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/mailbox")}
          className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Mailbox
        </button>
      </div>

      {/* Mail content box */}
      <div className="bg-emerald-50 p-6 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 break-words">
          {mail.subject || "(No Subject)"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          <strong>From:</strong> {mail.from} <span className="mx-2">|</span>
          <strong>To:</strong> {mail.to}
        </p>

        <hr className="mb-4" />

        <div
          className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: mail.body }}
        />
      </div>
    </div>
  );
};

export default MailDetail;
