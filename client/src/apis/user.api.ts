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
    return toast.promise(
        http.put<any>(
            `api/user/profile/`,
            {
                ...data,
            },
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken)}`,
                },
            },
        ),
        {
            pending: 'Edit profile is pending',
        },
    );
};

export const getCheckUserRela = (userId2: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.get<any>(`api/user-rela/check-user-relationship`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
        params: { userId2 },
    });
};
// sửa thành phương thức get
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

export const cancelFriendRequest = (id: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.post<any>(
        `api/user-rela/unsend-add-friend`,
        {},
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
            params: { id },
        },
    );
};

export const acceptFriendRequest = (id: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.put<any>(
        `api/user-rela/accept-add-friend`,
        {},
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
            params: { id },
        },
    );
};

export const unfriendRequest = (id: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.put<any>(
        `api/user-rela/unfriend`,
        {},
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
            params: { id },
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
            pending: 'Search is pending',
        },
    );
};
