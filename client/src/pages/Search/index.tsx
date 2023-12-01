import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getSearchUsers } from '~/apis/user.api';
import { AuthContext } from '~/context/AuthContext';
import { useQueryString } from '~/utils/util';

function Search() {
    const { currentUser } = useContext(AuthContext);
    const { q } = useQueryString();
    const { mutate, isLoading, isPending, isError, error, isSuccess, data }: any = useMutation({
        mutationFn: () => {
            return getSearchUsers(q);
        },
    });

    useEffect(() => {
        mutate();
    }, []);

    useEffect(() => {
        isError && console.log(error);
        isError && error?.response?.data.mes && toast.error(error?.response?.data.mes, { autoClose: false });
        isError && !error?.response?.data.mes && toast.error(error.message, { autoClose: false });

        if (isSuccess && data.data.success) toast.success(data.data.mes);
        if (isSuccess && !data.data.success) toast.error(data.data.mes, { autoClose: false });
    }, [isError, isSuccess]);

    return (
        <>
            {
                <div className="container mx-auto p-4">
                    {/* =========Start Show User==== */}
                    {data?.data?.data &&
                        data?.data?.data.length > 0 &&
                        data.data.data.map(
                            (user: any, index: number) =>
                                currentUser.id != user.id && (
                                    <div
                                        key={index}
                                        className="w-full mx-auto my-5 bg-white dark:bg-opacity-10 rounded-lg shadow-md overflow-hidden"
                                    >
                                        <div className="border-t border-gray-200 dark:border-gray-600 dark:text-textDark">
                                            <div className="border-t border-gray-200 dark:border-gray-600">
                                                <div className="p-4">
                                                    <div className="flex flex-nowrap items-center justify-between">
                                                        <Link to={`/profile/${user.id}`}>
                                                            <div className="flex items-center gap-4">
                                                                <img
                                                                    className="w-10 h-10 rounded-full"
                                                                    src={user.avatar}
                                                                    alt=""
                                                                />
                                                                <div className="font-medium  dark:text-textDark">
                                                                    <div>{user.fullName}</div>
                                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                        user
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            className="text-white bg-blue-600 focus:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                                                        >
                                                            <i className="fa-solid fa-user-plus" /> Add friend
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ),
                        )}
                </div>
            }
        </>
    );
}

export default Search;
