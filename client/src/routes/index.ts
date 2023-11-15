import { FunctionComponent } from 'react';

import Home from '~/pages/Home';
import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';
import { DefaultLayout, HeaderOnly } from '~/components/Layout';

interface RouteType {
    path: string;
    component: FunctionComponent;
    layout?: FunctionComponent<any> | null;
}

const publicRoutes: RouteType[] = [
    // { path: '/', component: Home, layout: DefaultLayout },
    { path: '/signin', component: SignIn, layout: null },
    { path: '/signup', component: SignUp, layout: null },
];

const privateRoutes: RouteType[] = [];

export { publicRoutes, privateRoutes };
