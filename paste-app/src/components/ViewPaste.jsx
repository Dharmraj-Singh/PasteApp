import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
    const { id } = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);
    const pasteToView = allPastes.find((paste) => paste._id === id);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">View Paste</h1>

                <div>
                    <label className="block text-gray-600 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={pasteToView.title}
                        disabled
                        className="w-full border border-gray-300 rounded-md px-4 py-3 bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-gray-600 font-medium mb-2">Content</label>
                    <textarea
                        value={pasteToView.content}
                        disabled
                        className="w-full border border-gray-300 rounded-md px-4 py-3 h-40 bg-gray-100 text-gray-700 resize-none cursor-not-allowed"
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewPaste;
