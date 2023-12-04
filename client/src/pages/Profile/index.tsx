import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getUserAccount, getCheckUserRela, listUserFriends } from '~/apis/user.api';
import EditProfile from './components/EditProfile';
import ViewAllFriends from './components/ViewAllFriends';
import { AuthContext } from '~/context/AuthContext';
import AddFriendBtn from './components/AddFriendBtn';
import UnAddFriendBtn from './components/UnAddFriendBtn';
import AddFollowBtn from './components/AddFollowBtn';
import UnFollowBtn from './components/UnFollowBtn';
import AcceptFriendBtn from './components/AcceptFriendBtn';
import DeclineFriendBtn from './components/DeclineFriendBtn';
import UnFriendBtn from './components/UnFriendBtn';
import { User } from '~/types/user.type';

function Profile() {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser]: any = useState({});
    const [userRela, setUserRela]: any = useState({});
    const [friendsList, setFriendsList]: any = useState([]);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showViewAllFriends, setShowViewAllFriends] = useState(false);
    const { userId }: any = useParams();

    // get user info
    const { mutate, isLoading, isPending, isError, error, isSuccess, data }: any = useMutation({
        mutationFn: () => {
            return getUserAccount(userId);
        },
    });

    useEffect(() => {
        isError && console.log(error);
        isError && error?.response?.data.mes && toast.error(error?.response?.data.mes, { autoClose: false });
        isError && !error?.response?.data.mes && toast.error(error.message, { autoClose: false });

        if (isSuccess && data.data.success) setUser(data.data.data);
        if (isSuccess && !data.data.success) toast.error(data.data.mes);
    }, [isError, isSuccess]);

    // Check relationship: friend-follow
    const checkRelationship: any = useMutation({
        mutationFn: () => {
            return getCheckUserRela(userId);
        },
    });

    useEffect(() => {
        checkRelationship.isError && console.log(checkRelationship.error);
        checkRelationship.isError &&
            checkRelationship.error?.response?.data.mes &&
            toast.error(checkRelationship.error?.response?.data.mes, { autoClose: false });
        checkRelationship.isError &&
            !checkRelationship.error?.response?.data.mes &&
            toast.error(checkRelationship.error.message, { autoClose: false });

        if (checkRelationship.isSuccess && checkRelationship.data.data.success)
            setUserRela(checkRelationship.data.data.data);
        if (checkRelationship.isSuccess && !checkRelationship.data.data.success) {
            setUserRela({});
            console.log(checkRelationship.data.data.mes);
        }
    }, [checkRelationship.isError, checkRelationship.isSuccess]);

    //Lấy danh sách bạn bè của user
    const listFriends: any = useMutation({
        mutationFn: () => {
            return listUserFriends({ userId, size: 6 });
        },
    });

    useEffect(() => {
        listFriends.isError && console.log(listFriends.error);
        listFriends.isError &&
            listFriends.error?.response?.data.mes &&
            toast.error(listFriends.error?.response?.data.mes, { autoClose: false });
        listFriends.isError &&
            !listFriends.error?.response?.data.mes &&
            toast.error(listFriends.error.message, { autoClose: false });

        if (listFriends.isSuccess && listFriends.data.data.success) setFriendsList(listFriends.data.data.data);
        if (listFriends.isSuccess && !listFriends.data.data.success) {
            setFriendsList([]);
            console.log(listFriends.data.data.mes);
        }
    }, [listFriends.isError, listFriends.isSuccess]);

    // Gọi api lần đầu
    useEffect(() => {
        mutate();
        listFriends.mutate();
        currentUser.id != userId && checkRelationship.mutate();
    }, [userId,showEditProfile]);

    return (
        <>
            {!isPending && Object.keys(user).length > 0 ? (
                <div className="container mx-auto p-4">
                    {/* ======Background- Avata- Bio - Button AddFriend, Follow */}
                    <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative">
                            <div className="relative">
                                <img
                                    className="w-full h-40 object-cover object-center"
                                    src={
                                        user.backgroundImage ||
                                        'https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-9/168437532_1129910154188876_8801987574127917687_n.jpg?stp=dst-jpg_s851x315&_nc_cat=102&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=yj7OeHbyzSQAX_kBnNk&_nc_ht=scontent.fdad3-5.fna&oh=00_AfCUj_vIRtTl_VbdcufCC9VRGK24fDOvVDbClSa_ThCC6A&oe=65818F9A'
                                    }
                                    alt="Cover Photo"
                                />
                                {currentUser?.id == user.id && (
                                    <button className="px-2 py-1 rounded-full bg-black bg-opacity-30 text-white absolute right-5 bottom-1 z-10">
                                        <i className="fa-solid fa-camera" />
                                    </button>
                                )}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/3">
                                <img
                                    className="w-24 h-24 lg:w-28 lg:h-28 mx-auto rounded-full"
                                    src={
                                        user.avatar ||
                                        'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/353448712_1660618624451357_885125259067810930_n.jpg?stp=dst-jpg_s851x315&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vJehIP5ofc4AX-kLl4O&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDSq0zWiMJabULBuP7JYadqQsr6JVMC2YsF_HOSLOEafA&oe=655F536C'
                                    }
                                    alt="Avatar"
                                />
                                {currentUser?.id == user.id && (
                                    <button className="p-2 py-1 rounded-full bg-black bg-opacity-20 text-white absolute top-2/3 left-[52%] z-10">
                                        <i className="fa-solid fa-camera" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="mt-5 p-4">
                            <h1 className="text-2xl font-bold text-gray-800 text-center mt-2">{user.fullName}</h1>
                            <p className="text-gray-600 text-center">{user.role}</p>
                            <div className="relative">
                                <div className="mt-5 px-10 border-gray-200 text-gray-600 text-center">
                                    {user.biography || 'Write biography'}
                                    {/* Cái giá của việc tồn tại rất lớn, hãy sống thật hạnh phúc! */}
                                </div>
                                {currentUser?.id == user.id && (
                                    <button className="absolute top-0 right-0">
                                        <i className="fa-solid fa-pen-to-square" />
                                    </button>
                                )}
                            </div>
                            <div className="mt-5 flex items-center justify-center gap-5">
                                {currentUser && currentUser?.id !== user.id && (
                                    <>
                                        {!userRela.friend && <AddFriendBtn callCheckRela={checkRelationship.mutate} />}
                                        {userRela.friend === 'pending' && <UnAddFriendBtn setUserRela={setUserRela} />}
                                        {userRela.friend === 'waiting' && (
                                            <>
                                                <AcceptFriendBtn callCheckRela={checkRelationship.mutate} />
                                                <DeclineFriendBtn callCheckRela={checkRelationship.mutate} />
                                            </>
                                        )}
                                        {userRela.friend === 'friend' && <UnFriendBtn setUserRela={setUserRela} />}
                                        {!userRela.follow && <AddFollowBtn callCheckRela={checkRelationship.mutate} />}
                                        {userRela.follow === 'follow' && (
                                            <UnFollowBtn callCheckRela={checkRelationship.mutate} />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {showEditProfile && !showViewAllFriends && (
                        <EditProfile user={user} setShowEditProfile={setShowEditProfile} />
                    )}
                    {showViewAllFriends && !showEditProfile && (
                        <ViewAllFriends userId={user.id} setShowViewAllFriends={setShowViewAllFriends} />
                    )}
                    {!showEditProfile && !showViewAllFriends && (
                        <>
                            {/* =====Info===== */}
                            <div className="my-5 grid lg:grid-cols-2 gap-5">
                                <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="px-4 py-2 flex items-center justify-between">
                                        <p className="text-gray-600">Info:</p>
                                        <button onClick={() => setShowEditProfile(true)}>
                                            {currentUser?.id == user.id ? (
                                                <i className="fa-solid fa-pen-to-square" />
                                            ) : (
                                                <span className="text-link">more</span>
                                            )}
                                        </button>
                                    </div>
                                    <div className="border-t border-gray-200">
                                        <div className="px-4 py-2">
                                            <label className="text-gray-600">Address:</label>
                                            <span className="ml-2 text-gray-800">{user.address}</span>
                                        </div>
                                        <div className="px-4 py-2">
                                            <label className="text-gray-600">Study at:</label>
                                            <span className="ml-2 text-gray-800">{user.studyAt}</span>
                                        </div>
                                        <div className="px-4 py-2">
                                            <label className="text-gray-600">Working at:</label>
                                            <span className="ml-2 text-gray-800">{user.workingAt}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* ===========Friend============= */}
                                <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="border-t border-gray-200">
                                        <div className="px-4 py-2 flex items-center justify-between">
                                            <p className="text-gray-600">Friend:</p>
                                            <button onClick={() => setShowViewAllFriends(true)} className="text-link">
                                                View all friends
                                            </button>
                                        </div>
                                        <div className="border-t border-gray-200">
                                            <div className="px-4 py-2 grid grid-cols-3">
                                                {friendsList.length > 0 &&
                                                    friendsList.map((el: User) => (
                                                        <Link
                                                            to={`/profile/${el.id}`}
                                                            key={el.id}
                                                            className="mx-auto flex-cow items-center justify-center"
                                                        >
                                                            <img
                                                                className="mx-auto w-20 h-20 rounded"
                                                                src={
                                                                    el.avatar ||
                                                                    'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/405296117_2903850576419341_2491313395414210813_n.jpg?stp=dst-jpg_p600x600&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qzeatfqWRXoAX8V4eC2&_nc_ht=scontent.fdad3-6.fna&oh=00_AfD8yeezhu14NwrEvwE2MEjYtv2Ao5yDHa36jylmo434Gw&oe=656B75D4'
                                                                }
                                                                alt="Large avatar"
                                                            />
                                                            <div className="text-xs md:text-base font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-24 text-center">
                                                                {el.fullName}
                                                            </div>
                                                        </Link>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* =====End Info====Start My Post==== */}
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
                        </>
                    )}
                </div>
            ) : (
                <div className="container h-[calc(100vh-120px)] flex flex-col gap-5 p-4">
                    <div className="w-full mx-auto flex-1 bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
                    <div className="w-full mx-auto flex-1 bg-gray-300 rounded-lg shadow-md animate-pulse"></div>
                </div>
            )}
        </>
    );
}

export default Profile;
