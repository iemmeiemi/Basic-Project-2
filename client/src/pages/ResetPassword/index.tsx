import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { resetPassword } from '~/apis/auth.api';
import { AuthContext } from '~/context/AuthContext';

function ResetPassword() {
    const { currentUser } = useContext(AuthContext);
    const { resetToken } = useParams();

    const [inputs, setInputs] = useState({
        resetToken,
        password: '',
        confirmPassword: '',
        isAccept: false,
    });
    // ===================================================================
    const { mutate, isPending, isError, error, isSuccess, data }: any = useMutation({
        mutationFn: () => {
            return resetPassword(inputs);
        },
    });

    useEffect(() => {
        isError && console.log(error);
        isError && error?.response?.data.mes && toast.error(error?.response?.data.mes);

        if (isSuccess && data.data.success) toast.success(data.data.mes);
        if (isSuccess && !data.data.success) toast.error(data.data.mes);
        if (isSuccess && data.data.success) window.location.pathname = '/signin';
        
    }, [isError, isSuccess]);
    // =====================================================================
    const handleResetPassword = (e: any) => {
        e.preventDefault();

        if (inputs.password === inputs.confirmPassword && inputs.isAccept) {
            mutate();
        } else if (inputs.isAccept) {
            toast.error('Password does not match the confirm password', {
                autoClose: 5000,
            });
        } else
            toast.error('Please accept the Terms and Conditions', {
                autoClose: 5000,
            });
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
                                    Changed password?
                                </h1>
                                <form
                                    className="space-y-4 md:space-y-6"
                                    action="#"
                                    onSubmit={(e) => handleResetPassword(e)}
                                >
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            New password
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
                                    <div>
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Confirm password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            value={inputs.confirmPassword}
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
                                                    id="isAccept"
                                                    aria-describedby="isAccept"
                                                    name="isAccept"
                                                    onChange={(e) =>
                                                        setInputs({ ...inputs, isAccept: !inputs.isAccept })
                                                    }
                                                    type="checkbox"
                                                    checked={inputs.isAccept}
                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50  dark:bg-gray-700 dark:border-gray-600 focus:ring-0"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="isAccept" className="text-gray-500 dark:text-gray-300">
                                                    {'I accept the '}
                                                    <a
                                                        href="#"
                                                        className="text-sm font-medium dark:text-gray-300 underline"
                                                    >
                                                        Terms and Conditions
                                                    </a>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-textDark dark:text-text bg-black bg-opacity-70 hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-opacity-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white 
                                            dark:bg-opacity-50 dark:hover:bg-opacity-80 dark:focus:ring-opacity-100"
                                    >
                                        Reset password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default ResetPassword;
