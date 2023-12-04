import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { listUserFriends } from '~/apis/user.api';
import { User } from '~/types/user.type';

function ViewAllFriends({ userId, setShowViewAllFriends }: any) {
    const [friendsList, setFriendsList]: any = useState([]);

    const listFriends: any = useMutation({
        mutationFn: () => {
            return listUserFriends({ userId });
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

    useEffect(() => {
        listFriends.mutate();
    }, []);

    return (
        <div className="my-5 gap-5">
            <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-t border-gray-200">
                    <div className="px-4 py-2 flex items-center justify-between">
                        <p className="text-gray-600">Friend:</p>
                        <button onClick={() => setShowViewAllFriends(false)}>
                            <i className="fa-solid fa-arrow-right-from-bracket" />
                        </button>
                    </div>
                    <div className="border-t border-gray-200">
                        <div className="px-4 py-2 grid grid-cols-3  md:grid-cols-4 lg:grid-cols-5">
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
    );
}

export default ViewAllFriends;
