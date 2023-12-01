import { useContext } from 'react';

import { AuthContext } from '~/context/AuthContext';

function Posting() {
    const { currentUser } = useContext(AuthContext);
    return (
            <div className="w-full mx-auto mb-5 bg-white dark:bg-opacity-10 rounded-lg shadow-md overflow-hidden">
                <div className="">
                    <div className="px-4 py-2">
                        <p className="text-xl text-gray-600 dark:text-textDark">FConnect</p>
                        <div className="mt-2 flex gap-5 items-center justify-center">
                            <input
                                type="text"
                                name="posting"
                                id="posting"
                                className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={`Hi ${currentUser.firstName}! How are you today?`}
                                required
                            />
                            <button
                                type="button"
                                className="text-white bg-blue-600 focus:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                            >
                                Posting
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Posting;
