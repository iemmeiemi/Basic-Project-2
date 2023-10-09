import { FunctionComponent } from 'react';


import Home from '~/pages/Home';
import Signup from '~/pages/Signup';
import Signin from '~/pages/Signin';
import { HeaderOnly } from '~/components/Layout';

interface RouteType {
    path: string,
    component: FunctionComponent,
    layout?: FunctionComponent<any> | null
};

const publicRoutes: RouteType[]  = [
    { path: '/', component: Home, layout: HeaderOnly },
    { path: '/signin', component: Signin, layout: null },
    { path: '/signup', component: Signup },
];

const privateRoutes: RouteType[] = [];

export { publicRoutes, privateRoutes };
