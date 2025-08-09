import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { sendMail } from "../firebase/database";
import { useSelector } from "react-redux";

const ComposeMail = () => {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const senderEmail = useSelector((state) => state.user.email);

    const handleSend = async () => {
        if (!to || !subject || !editorState.getCurrentContent().hasText()) {
            setError("All fields are required");
            setSuccess("");
            return;
        }

        const htmlBody = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const mail = {
            from: senderEmail,
            to,
            subject,
            body: htmlBody,
            timestamp: Date.now(),
        };

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await sendMail(mail);
            if (!res.ok) throw new Error("Failed to send mail");

            // const mailWithId = { ...mail, id: res.id };

            setSuccess("Mail sent successfully!");
            setTo("");
            setSubject("");
            setEditorState(EditorState.createEmpty());
        } catch (err) {
            console.error(err);
            setError("Failed to send mail. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-emerald-700">Compose Mail</h2>

            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

            <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
                {/* From */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                        type="email"
                        value={senderEmail}
                        disabled
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* To */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                        type="email"
                        placeholder="Recipient's Email"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                </div>

                {/* Subject */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                        type="text"
                        placeholder="Email Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                </div>

                {/* Body */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                    <div className="border border-gray-300 rounded-lg">
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="p-4 min-h-[200px]"
                            toolbarClassName="border-b border-gray-200"
                            toolbar={{
                                options: ["inline", "blockType", "fontSize", "list", "textAlign", "colorPicker", "link"],
                                inline: {
                                    options: ["bold", "italic", "underline", "strikethrough"],
                                    className: "mr-2",
                                },
                            }}
                        />
                    </div>
                </div>

                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="w-full sm:w-auto bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-60"
                >
                    {loading ? "Sending..." : "Send Mail"}
                </button>
            </div>
        </div>
    );
};

export default ComposeMail;