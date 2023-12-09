import Datepicker from 'tailwind-datepicker-react';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '~/context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as userApi from '~/apis/user.api';

function EditProfile({ user, setShowEditProfile }: any) {
    const { currentUser } = useContext(AuthContext);
    const [showSelectDate, setShowSelectDate] = useState(false);
    const [inputs, setInputs] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        birthday: new Date(user.birthday),
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        studyAt: user.studyAt || '',
        workingAt: user.workingAt || '',
    });
    const genders = ['Male', 'Female', 'Other'];

    const { mutate, isLoading, isPending, isError, error, isSuccess, data }: any = useMutation({
        mutationFn: () => {
            return userApi.editUserAccount({ id: currentUser.id, ...inputs });
        },
    });

    useEffect(() => {
        isError && console.log(error);
        isError && error?.response?.data.mes && toast.error(error?.response?.data.mes, { autoClose: false });
        isError && !error?.response?.data.mes && toast.error(error.message, { autoClose: false });

        if (isSuccess && data.data.success) toast.success(data.data.mes);
        if (isSuccess && !data.data.success) toast.error(data.data.mes);
    }, [isError, isSuccess]);

    const handleInputsChange = (e: any) => {
        currentUser?.id == user.id &&
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value,
            });
    };

    const handleChangeBirthDay = (selectedDate: any) => {
        currentUser?.id == user.id &&
            setInputs({
                ...inputs,
                birthday: selectedDate,
            });
    };

    const handleClose = (state: boolean) => {
        currentUser?.id == user.id && setShowSelectDate(state);
    };

    const options = {
        title: 'Birth Date',
        autoHide: true,
        todayBtn: false,
        maxDate: new Date(Date.now()),
        minDate: new Date('1900-01-01'),
        theme: {
            background: 'bg-white dark:bg-gray-800',
            todayBtn: '',
            clearBtn: '',
            icons: '',
            text: '',
            disabledText: '',
            input: '',
            inputIcon: '',
            selected: '',
        },
        defaultDate: new Date(inputs.birthday),
        language: 'en',
    };

    return (
        <div className="my-5 gap-5">
            <div className="w-full mx-auto bg-white rounded-lg shadow-md">
                <div className="px-4 py-2 flex items-center justify-between">
                    <p className="text-gray-600">Info:</p>
                    <button onClick={() => setShowEditProfile(false)}>
                        <i className="fa-solid fa-arrow-right-from-bracket" />
                    </button>
                </div>
                <div className="border-t border-gray-200">
                    <div className="px-4 py-2 grid grid-cols-2 gap-5">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                First name:
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={inputs.firstName}
                                onChange={(e) => handleInputsChange(e)}
                                className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Last name:
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={inputs.lastName}
                                onChange={(e) => handleInputsChange(e)}
                                className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>

                    <div className="px-4 py-2 grid gap-4 lg:grid-cols-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-900 dark:text-white">
                                Gender:
                            </label>
                            {genders.map((value, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        id={`gender-radio-${index}`}
                                        name="gender"
                                        type="radio"
                                        checked={index === inputs.gender}
                                        onChange={
                                            currentUser?.id == user.id
                                                ? () => setInputs({ ...inputs, gender: index })
                                                : () => {}
                                        }
                                        value={index}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="gender-radio-0"
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {value}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-5">
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Birth Date:
                            </label>

                            <div className="relative max-w-sm flex-1">
                                <div>
                                    <Datepicker
                                        options={options}
                                        onChange={handleChangeBirthDay}
                                        show={showSelectDate}
                                        setShow={handleClose}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-2 grid gap-4 md:grid-cols-2 md:gap-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email:
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
                                htmlFor="phone"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your phone:
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={inputs.phone}
                                onChange={(e) => handleInputsChange(e)}
                                className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="your phone"
                            />
                        </div>
                    </div>

                    <div className="px-4 py-2 grid gap-4 md:grid-cols-2 md:gap-5">
                        <div>
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Address:
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={inputs.address}
                                onChange={(e) => handleInputsChange(e)}
                                className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Address"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="studyAt"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Study at:
                            </label>
                            <input
                                type="text"
                                name="studyAt"
                                id="studyAt"
                                value={inputs.studyAt}
                                onChange={(e) => handleInputsChange(e)}
                                className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="study at"
                            />
                        </div>
                    </div>

                    <div className="px-4 py-2 grid gap-4 md:grid-cols-2 md:gap-5">
                        <div>
                            <label
                                htmlFor="workingAt"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Working at:
                            </label>
                            <input
                                type="text"
                                name="workingAt"
                                id="workingAt"
                                value={inputs.workingAt}
                                onChange={(e) => handleInputsChange(e)}
                                className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="working at"
                            />
                        </div>
                    </div>

                    <div className="px-4 py-2 text-right">
                        {currentUser?.id == user.id && (
                            <button
                                onClick={() => mutate()}
                                type="button"
                                className="text-white bg-blue-600 focus:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
