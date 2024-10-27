import React, { useState } from "react";

const MessageDialog = ({ isOpen, onClose, onSend }) => {
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");

    const handleSend = () => {
        onSend(message, date);
        onClose();
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-5 rounded shadow-lg">
                    <h2 className="text-lg font-semibold">Send Interview Details</h2>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message here..."
                        className="w-full h-24 border rounded p-2"
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border rounded p-2 my-2"
                    />
                    <div className="flex justify-end">
                        <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded">
                            Send
                        </button>
                        <button onClick={onClose} className="bg-gray-300 text-black p-2 rounded ml-2">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default MessageDialog;
