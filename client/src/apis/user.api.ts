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

export const getCheckUserRela = (id: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.get<any>(`api/user-rela/check-user-relationship`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
        params: { id },
    });
};
// sửa thành phương thức get
export const addFriend = (id: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return toast.promise(
        http.post<any>(
            `api/user-rela/add-friend2`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken)}`,
                },
                params: { id },
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

export const followUser = (id: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.put<any>(
        `api/user-rela/follow-user`,
        {},
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
            params: { id },
        },
    );
};

export const unfollowUser = (id: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.put<any>(
        `api/user-rela/unfollow-user`,
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

export const listUserFriends = ({ userId, page = 0, size }: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.get<any>(
        `api/user-rela/list-friend2`,
        {
            params: { userId, page, size },
        },
    );
};
