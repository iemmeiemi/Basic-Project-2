import http from '~/utils/http';

export const getUser = (userId: number | string) => {
    return http.get<any>(`api/user/${userId}`);
};
