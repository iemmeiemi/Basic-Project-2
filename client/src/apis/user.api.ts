import { toast } from 'react-toastify';
import http from '~/utils/http';

export const getUser = (userId: number | string) => {
    return http.get<any>(`api/user/${userId}`);
};

export const getUserAccount = (userId: number | string) => {
    return http.get<any>(`api/user/profile/${userId}`);
};

export const editUserAccount = (data: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.put<any>(
        `api/user/profile/`,
        {
            ...data,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        },
    );
};

export const addFriend = (receiver: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return toast.promise(
        http.post<any>(
            `api/user-rela/add-friend2`,
            {
                receiver,
            },
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken)}`,
                },
            },
        ),
        {
            pending: 'Add friend is pending',
        },
    );
};

export const getSearchUsers = (q: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return toast.promise(
        http.get<any>(`api/user/search`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
            params: { q },
        }),
        {
            pending: 'Add friend is pending',
        },
    );
};
