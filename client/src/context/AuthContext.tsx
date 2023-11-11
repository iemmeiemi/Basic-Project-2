import { useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useLayoutEffect, useState } from 'react';

import { getCurrent, login } from '~/apis/auth.api';
import { User } from '~/types/user.type';
// import { useQueryString } from '~/utils/util';

const AuthContext = createContext<any>({});

const AuthContextProvider = ({ children }: any) => {
    const userLocal = sessionStorage.getItem('user') || 'null';
    const [currentUser, setCurrentUser]: [User, any] = useState(JSON.parse(userLocal));

    const loginAccount = async (inputs: any) => {
        try {
            const { data } = await login(inputs.email, inputs.password);
            if (data?.success && inputs.remember) {
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
            } else console.log(data);

            data?.success && setCurrentUser(data?.data);
        } catch (error: any) {
            console.log('err:', error?.response?.data);
        }
    };
    const loginCurrent = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken') || 'null';
            const { data } = await getCurrent(JSON.parse(accessToken));
            if (data?.success) setCurrentUser(data?.data);
            else {
                console.log(data);
                setCurrentUser(null);
            }
        } catch (error: any) {
            console.log('err:', error?.response?.data);
        }
    };
    console.log(currentUser);
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
        loginCurrent();
    }, []);
    return <AuthContext.Provider value={{ currentUser, loginAccount }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
