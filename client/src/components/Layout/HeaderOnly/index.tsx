import { ReactNode } from 'react';

import Header from '../components/Header';

interface HeaderOnlyProps {
    children: ReactNode;
}

function HeaderOnly({ children }: HeaderOnlyProps) {
    return (
        <>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default HeaderOnly;
