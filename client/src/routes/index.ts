import { FunctionComponent } from 'react';

import { DefaultLayout, HeaderOnly } from '~/components/Layout';
import Home from '~/pages/Home';
import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';
import ForgotPassword from '~/pages/ForgotPassword';
import ResetPassword from '~/pages/ResetPassword';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';

interface RouteType {
    path: string;
    component: FunctionComponent;
    layout?: FunctionComponent<any> | null;
}

const publicRoutes: RouteType[] = [
    // { path: '/', component: Home, layout: DefaultLayout },
    { path: '/signin', component: SignIn, layout: null },
    { path: '/signup', component: SignUp, layout: null },
    { path: '/forgotpassword', component: ForgotPassword, layout: null },
    { path: '/resetpassword/:resetToken', component: ResetPassword, layout: null },
    { path: '/profile/:userId', component: Profile },
];

const privateRoutes: RouteType[] = [{ path: '/search', component: Search }];

export { publicRoutes, privateRoutes };
