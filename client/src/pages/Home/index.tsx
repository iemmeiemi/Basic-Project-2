import { useContext } from 'react';

import { AuthContext } from '~/context/AuthContext';
import Posting from './components/Posting';

function Home() {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            {currentUser && (
                <div className="container mx-auto p-4">
                    <Posting/>
                    {/* =========Start Show Post==== */}
                    <div className="w-full mx-auto my-5 bg-white dark:bg-opacity-10 rounded-lg shadow-md overflow-hidden">
                        <div className="border-t border-gray-200 dark:border-gray-600 dark:text-textDark">
                            <div className="border-t border-gray-200 dark:border-gray-600">
                                <div className="p-4">
                                    <div className="flex flex-nowrap items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/353448712_1660618624451357_885125259067810930_n.jpg?stp=dst-jpg_s851x315&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vJehIP5ofc4AX-kLl4O&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDSq0zWiMJabULBuP7JYadqQsr6JVMC2YsF_HOSLOEafA&oe=655F536C"
                                                alt=""
                                            />
                                            <div className="font-medium  dark:text-textDark">
                                                <div>Rex Dev</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    2 hours ago
                                                </div>
                                            </div>
                                        </div>
                                        <i className="fa-solid fa-ellipsis cursor-pointer" />
                                    </div>
                                    <div className="mt-5">
                                        <p>Cuộc sống là những ngày đau cột sống.</p>
                                    </div>
                                </div>
                                <div className="border-t p-4 flex gap-5 justify-between lg:justify-start">
                                    <div>
                                        <i className="fa-regular fa-heart" /> 0 likes
                                    </div>
                                    <div>
                                        <i className="fa-regular fa-comment-dots" /> 0 comments
                                    </div>
                                    <div>
                                        <i className="fa-regular fa-share-from-square" /> share
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mx-auto my-5 bg-white dark:bg-opacity-10 rounded-lg shadow-md overflow-hidden">
                        <div className="border-t border-gray-200 dark:border-gray-600 dark:text-textDark">
                            <div className="border-t border-gray-200 dark:border-gray-600">
                                <div className="p-4">
                                    <div className="flex flex-nowrap items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/353448712_1660618624451357_885125259067810930_n.jpg?stp=dst-jpg_s851x315&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vJehIP5ofc4AX-kLl4O&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDSq0zWiMJabULBuP7JYadqQsr6JVMC2YsF_HOSLOEafA&oe=655F536C"
                                                alt=""
                                            />
                                            <div className="font-medium  dark:text-textDark">
                                                <div>Rex Dev</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    2 hours ago
                                                </div>
                                            </div>
                                        </div>
                                        <i className="fa-solid fa-ellipsis cursor-pointer" />
                                    </div>
                                    <div className="mt-5">
                                        <p>Cuộc sống là những ngày đau cột sống.</p>
                                    </div>
                                </div>
                                <div className="border-t p-4 flex gap-5 justify-between lg:justify-start">
                                    <div>
                                        <i className="fa-regular fa-heart" /> 0 likes
                                    </div>
                                    <div>
                                        <i className="fa-regular fa-comment-dots" /> 0 comments
                                    </div>
                                    <div>
                                        <i className="fa-regular fa-share-from-square" /> share
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mx-auto my-5 bg-white dark:bg-opacity-10 rounded-lg shadow-md overflow-hidden">
                        <div className="border-t border-gray-200 dark:border-gray-600 dark:text-textDark">
                            <div className="border-t border-gray-200 dark:border-gray-600">
                                <div className="p-4">
                                    <div className="flex flex-nowrap items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/353448712_1660618624451357_885125259067810930_n.jpg?stp=dst-jpg_s851x315&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vJehIP5ofc4AX-kLl4O&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDSq0zWiMJabULBuP7JYadqQsr6JVMC2YsF_HOSLOEafA&oe=655F536C"
                                                alt=""
                                            />
                                            <div className="font-medium  dark:text-textDark">
                                                <div>Rex Dev</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    2 hours ago
                                                </div>
                                            </div>
                                        </div>
                                        <i className="fa-solid fa-ellipsis cursor-pointer" />
                                    </div>
                                    <div className="mt-5">
                                        <p>Cuộc sống là những ngày đau cột sống.</p>
                                    </div>
                                </div>
                                <div className="border-t p-4 flex gap-5 justify-between lg:justify-start">
                                    <div>
                                        <i className="fa-regular fa-heart" /> 0 likes
                                    </div>
                                    <div>
                                        <i className="fa-regular fa-comment-dots" /> 0 comments
                                    </div>
                                    <div>
                                        <i className="fa-regular fa-share-from-square" /> share
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
            )}
        </>
    );
}

export default Home;
