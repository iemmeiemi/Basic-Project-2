import http from '~/utils/http';

export const createPost = (formData: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.post<any>(`api/post/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
};

export const getAllPostOfUser = ({ userId, page = 0, size }: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.get<any>(`api/post/all-post-of-user`, {
        params: { userId, page, size },
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
};

export const getAllPostOfUserByPublish = ({ userId, page = 0, size }: any) => {
    return http.get<any>(`api/post/all-post-of-user-by-publish`, {
        params: { userId, page, size },
    });
};

export const getAllPostNewAndInterest = ({ userId, page = 0, size }: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.get<any>(`api/post/all-post-new-and-interest`, {
        params: { page, size },
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
};

export const likeByUser = (postId: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.put<any>(
        `api/post/like`,
        { postId },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        },
    );
};

export const unlikeByUser = (postId: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.put<any>(
        `api/post/unlike`,
        { postId },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        },
    );
};

export const editPost = (postId: any, formData: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.put<any>(`api/post/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
};

export const deletePost = (postId: any) => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.delete<any>(`api/post/${postId}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
};
