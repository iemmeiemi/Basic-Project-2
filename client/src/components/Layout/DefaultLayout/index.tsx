import { ReactNode } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default DefaultLayout;
