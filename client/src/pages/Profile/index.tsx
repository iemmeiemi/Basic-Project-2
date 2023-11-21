import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '~/apis/user.api';

function Profile() {
    const [user, setUser]: any = useState({});
    const { userId }: any = useParams();
    const { mutate, isLoading, isPending, isError, error, isSuccess, data }: any = useMutation({
        mutationFn: () => {
            return getUser(userId);
        },
    });
    console.log('load', isPending);

    useEffect(() => {
        isError && console.log(error);
        isError && error?.response?.data.mes && toast.error(error?.response?.data.mes);

        if (isSuccess && data.data.success) setUser(data.data.data);
        if (isSuccess && !data.data.success) toast.error(data.data.mes);
    }, [isError, isSuccess]);
    useEffect(() => {
        mutate();
    }, []);

    return (
        <>
            {!isPending && Object.keys(user).length > 0 ? (
                <div className="container mx-auto p-4">
                    <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative">
                            <img
                                className="w-full h-40 object-cover object-center"
                                src={
                                    user.backgroundImage ||
                                    'https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-9/168437532_1129910154188876_8801987574127917687_n.jpg?stp=dst-jpg_s851x315&_nc_cat=102&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=yj7OeHbyzSQAX_kBnNk&_nc_ht=scontent.fdad3-5.fna&oh=00_AfCUj_vIRtTl_VbdcufCC9VRGK24fDOvVDbClSa_ThCC6A&oe=65818F9A'
                                }
                                alt="Cover Photo"
                            />
                            <img
                                className="w-24 h-24 mx-auto rounded-full absolute bottom-0 left-0 right-0 transform translate-y-1/3"
                                src={
                                    user.avatar ||
                                    'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/353448712_1660618624451357_885125259067810930_n.jpg?stp=dst-jpg_s851x315&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vJehIP5ofc4AX-kLl4O&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDSq0zWiMJabULBuP7JYadqQsr6JVMC2YsF_HOSLOEafA&oe=655F536C'
                                }
                                alt="Avatar"
                            />
                        </div>
                        <div className="mt-5 p-4">
                            <h1 className="text-2xl font-bold text-gray-800 text-center mt-2">{user.fullName}</h1>
                            <p className="text-gray-600 text-center">Web Developer</p>
                            <div className="mt-5 border-gray-200 text-gray-600 text-center">
                                {user.biography}
                                {/* Cái giá của việc tồn tại rất lớn, hãy sống thật hạnh phúc! */}
                            </div>
                            <div className="mt-5 flex items-center justify-center gap-5">
                                <button
                                    type="button"
                                    className="text-white bg-blue-600 focus:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                                >
                                    <i className="fa-solid fa-user-plus" /> Add friend
                                </button>
                                <button
                                    type="button"
                                    className="text-white bg-blue-600 focus:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                                >
                                    <i className="fa-solid fa-plus" /> Follow
                                </button>
                            </div>
                        </div>
                        <div className="border-t border-gray-200">
                            <div className="px-4 py-2">
                                <label className="text-gray-600">Gender:</label>
                                <span className="ml-2 text-gray-800">Bê đê</span>
                            </div>
                            <div className="px-4 py-2">
                                <label className="text-gray-600">Location:</label>
                                <span className="ml-2 text-gray-800">New York, USA</span>
                            </div>
                            <div className="px-4 py-2">
                                <label className="text-gray-600">Email:</label>
                                <span className="ml-2 text-gray-800">john.doe@example.com</span>
                            </div>
                            <div className="px-4 py-2">
                                <label className="text-gray-600">Website:</label>
                                <span className="ml-2 text-blue-500 hover:underline">
                                    <a href="https://example.com">https://example.com</a>
                                </span>
                            </div>
                            <div className="border-t px-4 py-2 text-gray-600 cursor-pointer text-center">more...</div>
                        </div>
                    </div>
                    {/* ========== */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="w-full mx-auto my-5 bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="border-t border-gray-200">
                                <div className="px-4 py-2">
                                    <label className="text-gray-600">Gender:</label>
                                    <span className="ml-2 text-gray-800">Bê đê</span>
                                </div>
                                <div className="px-4 py-2">
                                    <label className="text-gray-600">Location:</label>
                                    <span className="ml-2 text-gray-800">New York, USA</span>
                                </div>
                                <div className="px-4 py-2">
                                    <label className="text-gray-600">Email:</label>
                                    <span className="ml-2 text-gray-800">john.doe@example.com</span>
                                </div>
                                <div className="px-4 py-2">
                                    <label className="text-gray-600">Website:</label>
                                    <span className="ml-2 text-blue-500 hover:underline">
                                        <a href="https://example.com">https://example.com</a>
                                    </span>
                                </div>
                                <div className="border-t px-4 py-2 text-gray-600 cursor-pointer text-center">
                                    more...
                                </div>
                            </div>
                        </div>
                        <div className="w-full mx-auto my-5 bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="border-t border-gray-200">
                                <div className="px-4 py-2">
                                    <p className="text-gray-600">Friend:</p>
                                </div>
                                <div className="border-t border-gray-200">
                                    <div className="px-4 py-2 grid grid-cols-4 lg:grid-cols-3">
                                        <div className="mx-auto flex-cow items-center justify-center">
                                            <img
                                                className="mx-auto w-12 h-12 md:w-20 md:h-20 rounded"
                                                src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/394482877_1128324195194313_2535370621627794330_n.jpg?stp=c1.3.318.317a_dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hVeFMDOk-pcAX9GIPDP&_nc_ht=scontent.fdad1-3.fna&oh=00_AfBJa0dlsah1yMBybkDpXf2HOn19cJjCH25nwpWwuP2hKQ&oe=655F8838"
                                                alt="Large avatar"
                                            />
                                            <div className="text-xs md:text-base font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-12 md:w-24 text-center">
                                                Nguyễn Mai
                                            </div>
                                        </div>
                                        <div className="mx-auto flex-cow items-center justify-center">
                                            <img
                                                className="mx-auto w-12 h-12 md:w-20 md:h-20 rounded"
                                                src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/394482877_1128324195194313_2535370621627794330_n.jpg?stp=c1.3.318.317a_dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hVeFMDOk-pcAX9GIPDP&_nc_ht=scontent.fdad1-3.fna&oh=00_AfBJa0dlsah1yMBybkDpXf2HOn19cJjCH25nwpWwuP2hKQ&oe=655F8838"
                                                alt="Large avatar"
                                            />
                                            <div className="text-xs md:text-base font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-12 md:w-24 text-center">
                                                Nguyễn Mai
                                            </div>
                                        </div>
                                        <div className="mx-auto flex-cow items-center justify-center">
                                            <img
                                                className="mx-auto w-12 h-12 md:w-20 md:h-20 rounded"
                                                src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/394482877_1128324195194313_2535370621627794330_n.jpg?stp=c1.3.318.317a_dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hVeFMDOk-pcAX9GIPDP&_nc_ht=scontent.fdad1-3.fna&oh=00_AfBJa0dlsah1yMBybkDpXf2HOn19cJjCH25nwpWwuP2hKQ&oe=655F8838"
                                                alt="Large avatar"
                                            />
                                            <div className="text-xs md:text-base font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-12 md:w-24 text-center">
                                                Nguyễn Mai
                                            </div>
                                        </div>
                                        <div className="mx-auto flex-cow items-center justify-center">
                                            <img
                                                className="mx-auto w-12 h-12 md:w-20 md:h-20 rounded"
                                                src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/394482877_1128324195194313_2535370621627794330_n.jpg?stp=c1.3.318.317a_dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hVeFMDOk-pcAX9GIPDP&_nc_ht=scontent.fdad1-3.fna&oh=00_AfBJa0dlsah1yMBybkDpXf2HOn19cJjCH25nwpWwuP2hKQ&oe=655F8838"
                                                alt="Large avatar"
                                            />
                                            <div className="text-xs md:text-base font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-12 md:w-24 text-center">
                                                Nguyễn Mai
                                            </div>
                                        </div>
                                        <div className="mx-auto flex-cow items-center justify-center">
                                            <img
                                                className="mx-auto w-12 h-12 md:w-20 md:h-20 rounded"
                                                src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/394482877_1128324195194313_2535370621627794330_n.jpg?stp=c1.3.318.317a_dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hVeFMDOk-pcAX9GIPDP&_nc_ht=scontent.fdad1-3.fna&oh=00_AfBJa0dlsah1yMBybkDpXf2HOn19cJjCH25nwpWwuP2hKQ&oe=655F8838"
                                                alt="Large avatar"
                                            />
                                            <div className="text-xs md:text-base font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-12 md:w-24 text-center">
                                                Nguyễn Mai
                                            </div>
                                        </div>
                                        <div className="mx-auto flex-cow items-center justify-center">
                                            <img
                                                className="mx-auto w-12 h-12 md:w-20 md:h-20 rounded"
                                                src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/394482877_1128324195194313_2535370621627794330_n.jpg?stp=c1.3.318.317a_dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hVeFMDOk-pcAX9GIPDP&_nc_ht=scontent.fdad1-3.fna&oh=00_AfBJa0dlsah1yMBybkDpXf2HOn19cJjCH25nwpWwuP2hKQ&oe=655F8838"
                                                alt="Large avatar"
                                            />
                                            <div className="text-xs md:text-base font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-12 md:w-24 text-center">
                                                Nguyễn Mai
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t px-4 py-2 text-gray-600 cursor-pointer text-center">
                                        more...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ========== */}
                    <div className="w-full mx-auto my-5 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="border-t border-gray-200">
                            <div className="px-4 py-2">
                                <p className="text-gray-600">My posts:</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mx-auto my-5 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="border-t border-gray-200">
                            <div className="border-t border-gray-200">
                                <div className="p-4">
                                    <div className="flex flex-nowrap items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/353448712_1660618624451357_885125259067810930_n.jpg?stp=dst-jpg_s851x315&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vJehIP5ofc4AX-kLl4O&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDSq0zWiMJabULBuP7JYadqQsr6JVMC2YsF_HOSLOEafA&oe=655F536C"
                                                alt=""
                                            />
                                            <div className="font-medium dark:text-white">
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
            ) : (
                <div className="container h-[calc(100vh-120px)] mx-auto p-4">
                    <div className="w-full mx-auto h-full bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
                </div>
            )}
        </>
    );
}

export default Profile;
