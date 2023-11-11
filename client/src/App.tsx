import { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'flowbite';

const SERVER_URL: string = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:5000/';

function App() {
    const { currentUser } = useContext(AuthContext);
    
    return (
        <Router>
            <div className="App h-screen bg-[#e9e9e9] dark:bg-black dark:bg-opacity-80 overflow-hidden">
                <Routes>
                    <Route
                        key={0}
                        path={'/'}
                        element={
                            !currentUser ? (
                                <Navigate to="/signin" />
                            ) : (
                                <DefaultLayout>
                                    <Home />
                                </DefaultLayout>
                            )
                        }
                    />
                    {publicRoutes.map((route, index) => {
                        let Layout: any = DefaultLayout;
                        if (route.layout) Layout = route.layout;
                        else if (route.layout === null) Layout = Fragment;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
