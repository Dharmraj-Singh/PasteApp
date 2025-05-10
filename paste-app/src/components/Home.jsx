import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { FaPlus } from 'react-icons/fa'; // Import icon

const Home = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');

    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if(pasteId) {
            const pasteToEdit = allPastes.find((paste) => paste._id === pasteId);
            setTitle(pasteToEdit.title);
            setContent(pasteToEdit.content);
        }
    }, [pasteId]);

    function createPaste() {
        const paste = {
            title: title,
            content: content,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if(pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setContent('');
        setSearchParams({});
    }

    return (
        <div className='p-6'>
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    type="text"
                    placeholder='Enter title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border-2 border-gray-300 rounded-md p-2 mt-2 w-[65%] pl-4'
                />
                <button
                    onClick={createPaste}
                    disabled={!title || !content}
                    className='p-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md'
                >
                    <FaPlus size={20} /> {/* Icon for add */}
                </button>
            </div>
            <div className='mt-4'>
                <textarea
                    placeholder='Enter content here'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='min-w-[500px] border-2 border-gray-300 rounded-md p-4 mt-4 w-full h-40'
                    rows={30}
                />
            </div>
        </div>
    );
}

export default Home;
