// import { useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getCurrent, login, refreshAccessToken } from '~/apis/auth.api';
import { User } from '~/types/user.type';
// import { useQueryString } from '~/utils/util';

const AuthContext = createContext<any>({});

const AuthContextProvider = ({ children }: any) => {
    const userLocal = sessionStorage.getItem('user') || 'null';
    const [currentUser, setCurrentUser]: [User, any] = useState(JSON.parse(userLocal));

    const loginAccount = async (inputs: any) => {
        try {
            const { data } = await login(inputs.email, inputs.password, inputs.remember);
            if (data?.success && inputs.remember) {
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
            }
            data?.success ? toast.success('Login successful') : toast.error(data?.mes);
            data?.success && setCurrentUser(data?.data);
        } catch (error: any) {
            toast.error(error?.message);
            console.log('err:', error?.response?.data);
        }
    };
    const loginCurrent = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken') || 'null';
            const { data } = await getCurrent(JSON.parse(accessToken));
            data?.success && toast.success('Login successful');
            setCurrentUser(data?.data);
        } catch (error: any) {
            console.log('err:', error?.response?.data);
            try {
                const { data } = await refreshAccessToken();
                localStorage.setItem('accessToken', JSON.stringify(data?.newAccessToken));
                loginCurrent();
            } catch (error: any) {
                console.log('err:', error?.response?.data);
            }
        }
    };
    ////////////////////////////REACT_QUERY////////////////////////////////////////
    // const queryString: {page?: string} = useQueryString();
    // const page = Number(queryString.page) || 1;

    // const {data, isLoading} = useQuery({
    //     queryKey: ['api/user/login'],
    //     queryFn: () => login(page, 10)
    // })
    //////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        currentUser && sessionStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    useLayoutEffect(() => {
        !currentUser && loginCurrent();
    }, []);
    return <AuthContext.Provider value={{ currentUser, loginAccount }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
