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
            <div className="a">
                <Header />
                <div className="fixed w-1/5">
                    <LeftBar />
                </div>
                <div className="fixed right-0 w-1/5">
                    <RightBar />
                </div>
            </div>
            <div className="md:grid w-screen md:grid-cols-5 gap-4">
                <div className="">{/* <LeftBar /> */}</div>
                <div className="content mt-2 p-4 md:col-span-3 rounded dark:bg-white dark:bg-opacity-5 overflow-y-auto">
                    {children}
                </div>
                <div>{/* <RightBar /> */}</div>
            </div>
        </>
    );
}

export default DefaultLayout;
