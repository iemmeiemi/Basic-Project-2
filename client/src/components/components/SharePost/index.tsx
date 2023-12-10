import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import * as postApi from '~/apis/post.api';
import { AuthContext } from '~/context/AuthContext';

function SharePost({ showSharePost, data }: any) {
    const { currentUser }: any = useContext(AuthContext);
    const postViewerOptions = ['Everyone', 'Friends', 'Only me'];
    const [postInputs, setPostInputs] = useState({
        userId: currentUser.id,
        caption: '',
        hasTag: '',
        postViewer: postViewerOptions[0],
        shareFrom: data.shareFrom || null,
    });
    //posting a post
    const createPost: any = useMutation({
        mutationFn: (formData) => {
            return postApi.createPost(formData);
        },
    });

    useEffect(() => {
        createPost.isError && console.log(createPost.error);
        createPost.isError && createPost.error?.response?.data.mes && toast.error(createPost.error?.response?.data.mes);
        createPost.isError && !createPost.error?.response?.data.mes && toast.error(createPost.error.message);

        if (createPost.isSuccess && createPost.data.data.success) toast.success(createPost.data.data.mes);
        if (createPost.isSuccess && !createPost.data.data.success) {
            toast.error(createPost.data.data.mes);
        }
    }, [createPost.isError, createPost.isSuccess]);

    const handleSubmit = () => {
        const formData: any = new FormData();
        for (let row of Object.entries(postInputs)) formData.append(row[0], row[1]);
        for (let row of formData.entries()) console.log(row[0], row[1]);
        createPost.mutate(formData);
    };

    return (
        <div className="w-full mx-auto overflow-hidden">
            <div className="">
                <div className="grid grid-rows-2 grid-cols-3 gap-5 items-center justify-center">
                    <input
                        value={postInputs.caption}
                        onChange={(e) => setPostInputs({ ...postInputs, caption: e.target.value })}
                        type="text"
                        name="caption"
                        id="caption"
                        className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-600 col-span-3"
                        placeholder={`New caption`}
                        required
                    />
                    <select
                        onChange={(e) =>
                            setPostInputs({ ...postInputs, postViewer: postViewerOptions[+e.target.value] })
                        }
                        value={postViewerOptions.indexOf(postInputs.postViewer)}
                        id="postViewer"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 col-span-1"
                    >
                        {postViewerOptions.map((el, index) => (
                            <option key={index} value={index}>
                                {el}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => showSharePost(false)}
                        type="button"
                        className="text-white bg-gray-600 focus:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none col-span-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="text-white bg-blue-600 focus:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none col-span-1"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SharePost;
