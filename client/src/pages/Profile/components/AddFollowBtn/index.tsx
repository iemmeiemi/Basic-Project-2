import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addFriend, followUser } from '~/apis/user.api';

function AddFollowBtn({ callCheckRela }: any) {
    const { userId }: any = useParams();
    const { mutate, isLoading, isPending, isError, error, isSuccess, data }: any = useMutation({
        mutationFn: () => {
            return followUser(userId);
        },
    });

    useEffect(() => {
        isError && console.log(error);
        isError && error?.response?.data.mes && toast.error(error?.response?.data.mes, { autoClose: false });
        isError && !error?.response?.data.mes && toast.error(error.message, { autoClose: false });

        if (isSuccess && data.data.success) {
            toast.success(data.data.mes);
            callCheckRela();
        }
        if (isSuccess && !data.data.success) toast.error(data.data.mes);
    }, [isError, isSuccess]);
    return (
        <button
            onClick={() => mutate()}
            type="button"
            className="text-white bg-blue-600 focus:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
        >
            <i className="fa-solid fa-square-plus" /> Follow
        </button>
    );
}

export default AddFollowBtn;
