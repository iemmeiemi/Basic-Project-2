import http from '~/utils/http';
// import { User } from '~/types/user.type';

// export const login = (page: number | string, limit: number|string) => http.get<User>('api/user/login', {
//     params: {
//         _page: page,
//         _limit: limit
//     }
// });

export const login = (email: string, password: string) =>
    http.post<any>('api/user/login', {
        email,
        password,
    });

export const getCurrent = (accessToken: string) => {
    return http.get<any>('api/user/current', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};