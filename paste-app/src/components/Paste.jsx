import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FaEdit, FaEye, FaTrash, FaCopy, FaShare } from 'react-icons/fa'; // Import icons

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filterData = pastes.filter((paste) => {
        return paste.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    function handleDelete(pasteId) {
        dispatch(deleteFromPastes(pasteId));
    }

    return (
        <div>
            <input
                type="search"
                className='border-2 border-gray-300 rounded-2xl p-2 mt-5 ml-5 min-w-[600px] pl-4'
                placeholder='Search here'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='flex flex-col gap-4 mt-5'>
                {filterData.map((paste) => (
                    <div className='border p-4 rounded-lg shadow-md' key={paste._id}>
                        <div className="font-bold text-lg">{paste.title}</div>
                        <div className="text-gray-700 text-sm">{paste.content}</div>
                        <div className='flex gap-4 mt-4'>
                            <button
                                className="flex items-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                                onClick={() => (window.location.href = `/?pasteId=${paste._id}`)}
                            >
                                <FaEdit size={18} className="mr-2" />
                                Edit
                            </button>
                            <button
                                className="flex items-center bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
                                onClick={() => (window.location.href = `/pastes/${paste._id}`)}
                            >
                                <FaEye size={18} className="mr-2" />
                                View
                            </button>
                            <button
                                className="flex items-center bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                                onClick={() => handleDelete(paste._id)}
                            >
                                <FaTrash size={18} className="mr-2" />
                                Delete
                            </button>
                            <button
                                className="flex items-center bg-gray-500 text-white p-2 rounded-md hover:bg-gray-700"
                                onClick={() => {
                                    navigator.clipboard.writeText(paste.content)
                                        .then(() => toast.success('Copied to clipboard'))
                                        .catch(() => toast.error('Failed to copy'));
                                }}
                            >
                                <FaCopy size={18} className="mr-2" />
                                Copy
                            </button>
                            <button
                                className="flex items-center bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700"
                                onClick={() => {
                                    navigator.share({
                                        title: paste.title,
                                        text: paste.content,
                                        url: window.location.href,
                                    })
                                        .then(() => toast.success('Shared successfully'))
                                        .catch(() => toast.error('Failed to share'));
                                }}
                            >
                                <FaShare size={18} className="mr-2" />
                                Share
                            </button>
                        </div>
                        <div className='text-gray-500 text-sm mt-2'>{paste.createdAt}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Paste;
