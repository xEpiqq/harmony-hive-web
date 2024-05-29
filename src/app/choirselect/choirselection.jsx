'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChoirSelection({ user }) {

    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChoirName, setNewChoirName] = useState('');

    async function updateChoir(choirid) {
        const response = await fetch('/api/prefchoir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                choirId: choirid,
                userId: user.id
            })
        });
        router.push('/music');
    }

    async function createNewChoir() {
        const response = await fetch('/api/createchoir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newChoirName,
                userId: user.id
            })
        });
        const data = await response.json();
        setIsModalOpen(false); // Close modal after choir creation
        router.refresh()
    }

    const choirList = user && user.choirs ? Object.keys(user.choirs).map(key => ({
        name: key,
        id: user.choirs[key],
    })) : [];

    const handleModalClose = () => setIsModalOpen(false);
    const handleChoirNameChange = (event) => setNewChoirName(event.target.value);
    const handleSaveChoir = () => {
        if (newChoirName.trim() !== '') {
            createNewChoir();
        }
    }

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <h1 className="block text-gray-700 text-sm font-bold mb-2">
                    Choose a Choir
                </h1>
                <button className="py-2 px-4 bg-green-500 text-white rounded" onClick={() => setIsModalOpen(true)}>Add New Choir</button>
            </div>
            <div className="mb-6">
                {choirList.length > 0 ? choirList.map(choir => (
                    <button
                        key={choir.id}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => updateChoir(choir.name)}
                    >
                        {choir.id}
                    </button>
                )) : <div>No choirs available</div>}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white shadow sm:rounded-lg relative">
                        <button type="button" className="absolute top-0 left-0 inline-flex items-center justify-center rounded-md p-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500" onClick={handleModalClose}>
                            X
                        </button>
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-semibold leading-6 text-gray-900">Add a New Choir</h3>
                            <form className="mt-5 sm:flex sm:items-center">
                                <div className="w-full">
                                    <input type="text" name="choirName" placeholder="Choir Name" onChange={handleChoirNameChange} value={newChoirName} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className="mt-5 sm:mt-0 sm:ml-3">
                                    <button type="button" className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto" onClick={handleSaveChoir}>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
