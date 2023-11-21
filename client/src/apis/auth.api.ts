import { toast } from 'react-toastify';
import http from '~/utils/http';
// import { User } from '~/types/user.type';

// export const login = (page: number | string, limit: number|string) => http.get<User>('api/user/login', {
//     params: {
//         _page: page,
//         _limit: limit
//     }
// });

export const login = (email: string, password: string, remember: boolean) =>
    toast.promise(
        http.post<any>('api/user/login', {
            email,
            password,
            remember,
        }),
        {
            pending: 'Login is pending',
            error: {
                render({ data }: any) {
                    return data.message;
                },
            },
        },
    );

export const getCurrent = () => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    return http.get<any>('api/user/current', {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
};

export const register = (inputs: any) => {
    return toast.promise(
        http.post<any>('api/user/register', {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            birthday: inputs.birthday,
            email: inputs.email,
            password: inputs.password,
        }),
        {
            pending: 'Register is pending'
        },
    );
};

export const forgotPassword = (inputs: any) => {
    return toast.promise(
        http.get<any>('api/user/forgotpassword', {
            params: {
                email: inputs.email
            }
        }),
        {
            pending: 'Forgot Password is pending',
        },
    );
};

export const resetPassword = (inputs: any) => {   
    return toast.promise(
        http.put<any>('api/user/resetpassword', {
            password: inputs.password,
            resetToken: inputs.resetToken,
        }),
        {
            pending: 'Reset Password is pending',
        },
    );
};

export const logout = () => {
    const accessToken = localStorage.getItem('accessToken') || 'null';
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    console.log(accessToken);
    
    return toast.promise(
        http.get<any>('api/user/logout', {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            }
        }),
        {
            pending: 'Logout is pending'
        },
    );
};

export const refreshAccessToken = () => {
    return http.get<any>('api/user/refreshaccesstoken');
};
