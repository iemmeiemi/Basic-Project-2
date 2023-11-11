import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';

import { AuthContext } from '~/context/AuthContext';
import { useQueryString } from '~/utils/util';

function Signin() {
    const { currentUser, loginAccount } = useContext(AuthContext);
    const [inputs, setInputs] = useState({ email: '', password: '', remember: false });
    const login = (e: any) => {
        e.preventDefault();
        loginAccount(inputs);
    };

    const handleInputsChange = (e: any) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            {currentUser ? (
                <Navigate to="/" />
            ) : (
                <section className="dark:bg-white dark:bg-opacity-5">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <Link to="/" className="flex items-center flex-shrink-0 text-text dark:text-textDark mr-6">
                            <span className="font-semibold text-xl tracking-tight">FConnect</span>
                        </Link>
                        <div className="w-full bg-white dark:bg-white dark:bg-opacity-10 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => login(e)}>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={inputs.email}
                                            onChange={(e) => handleInputsChange(e)}
                                            className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@gmail.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={inputs.password}
                                            onChange={(e) => handleInputsChange(e)}
                                            placeholder="••••••••"
                                            className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="remember"
                                                    aria-describedby="remember"
                                                    name="remember"
                                                    value={inputs.email}
                                                    onChange={(e) => handleInputsChange(e)}
                                                    type="checkbox"
                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50  dark:bg-gray-700 dark:border-gray-600 focus:ring-0"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <a href="#" className="text-sm font-medium dark:text-gray-300 hover:underline">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-textDark dark:text-text bg-black bg-opacity-70 hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-opacity-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white 
                                            dark:bg-opacity-50 dark:hover:bg-opacity-80 dark:focus:ring-opacity-100"
                                    >
                                        Sign in
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet?{' '}
                                        <a
                                            href="#"
                                            className="font-medium text-text hover:underline dark:text-gray-300"
                                        >
                                            Sign up
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default Signin;
