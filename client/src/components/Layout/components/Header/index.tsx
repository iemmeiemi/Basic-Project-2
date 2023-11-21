import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '~/context/AuthContext';

import { DarkModeContext } from '~/context/DarkModeContext';

function Header() {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            {/* THẺ ẢO DÙNG LÀM KHUNG CHO THẺ DƯỚI KÍCH HOẠT POSITION:FIXED */}
            <nav className="opacity-0 flex items-center lg:justify-between flex-wrap px-6 py-4 border-b-2 dark:border-none bg-gray-50 dark:bg-white dark:bg-opacity-10">
                <Link to="/" className="flex items-center flex-shrink-0 text-text dark:text-textDark mr-6">
                    <span className="font-semibold text-xl tracking-tight">FConnect</span>
                </Link>
                    <i className="fa-regular fa-sun dark:text-textDark"></i>
                <div className="flex items-center bg-gray-100 rounded-md p-2 ml-2 border">
                    <i className="fa-solid fa-magnifying-glass" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="bg-transparent ml-2 placeholder-gray-500 text-gray-700 border-none focus:ring-0 p-0"
                    />
                </div>

                <div className="ml-2 w-full ------block flex-grow flex -------lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        <a
                            href="#responsive-header"
                            className="block mt-4 lg:inline-block lg:mt-0 text-text dark:text-textDark hover:text-blue mr-4"
                        >
                            Docs
                        </a>
                    </div>
                    <div>
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg
                                className="absolute w-12 h-12 text-gray-400 dark:text-textDark -left-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </nav>
            {/* THẺ MAIN */}
            <nav className="fixed w-full top-0 flex items-center lg:justify-between flex-wrap px-6 py-4 border-b-2 dark:border-none bg-gray-50 dark:bg-white dark:bg-opacity-10 z-50">
                <Link to="/" className="flex items-center flex-shrink-0 text-text dark:text-textDark mr-6">
                    <span className="font-semibold text-xl tracking-tight">FConnect</span>
                </Link>
                {darkMode ? (
                    <i onClick={toggle} className="fa-regular fa-sun dark:text-textDark" />
                ) : (
                    <i onClick={toggle} className="fa-regular fa-moon w-4 h-4 dark:text-textDark" />
                )}

                <div className="flex items-center bg-gray-100 rounded-md p-2 ml-2 border">
                    <i className="fa-solid fa-magnifying-glass" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="bg-transparent ml-2 placeholder-gray-500 text-gray-700 border-none focus:ring-0 p-0"
                    />
                </div>

                <div className="ml-2 w-full ------block flex-grow flex -------lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        <a
                            href="#responsive-header"
                            className="block mt-4 lg:inline-block lg:mt-0 text-text dark:text-textDark hover:text-blue mr-4"
                        >
                            Docs
                        </a>
                    </div>
                    <div>
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            {currentUser?.avatar ? (
                                <img src={currentUser?.avatar} alt="" />
                            ) : (
                                <svg
                                    className="absolute w-12 h-12 text-gray-400 dark:text-textDark -left-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
