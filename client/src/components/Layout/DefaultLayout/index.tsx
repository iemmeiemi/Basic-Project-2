import { ReactNode } from 'react';

import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import RightBar from '../components/RightBar';

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <Header />
            <div className="md:grid w-screen md:grid-cols-5 gap-4">
                <LeftBar/>
                <div className="content mt-2 p-4 md:col-span-3 rounded dark:bg-white dark:bg-opacity-5">{children}</div>
                <RightBar/>
            </div>
        </>
    );
}

export default DefaultLayout;
