import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import * as postApi from '~/apis/post.api';
import { AuthContext } from '~/context/AuthContext';

function Posting() {
    const { currentUser }: any = useContext(AuthContext);
    const postViewerOptions = ['Everyone', 'Friends', 'Only me'];
    const [postInputs, setPostInputs] = useState({
        userId: currentUser.id,
        caption: '',
        hasTag: '',
        postViewer: postViewerOptions[0],
        files: [],
        shareFrom: null,
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

    const handleUploadFile = (e: any) => {
        const files: any = Array.from(e.target.files);
        setPostInputs({ ...postInputs, files });
    };
    const handleSubmit = () => {
        const { files, ...data } = postInputs;
        const formData: any = new FormData();
        files.forEach((file: any, index) => {
            if (file.type.match('image')) formData.append('images', file);
            if (file.type.match('video')) formData.append('images', file);
        });
        for (let row of Object.entries(data)) formData.append(row[0], row[1]);
        for (let row of formData.entries()) console.log(row[0], row[1]);
        createPost.mutate(formData);
    };

    return (
        <div className="w-full mx-auto mb-5 bg-white dark:bg-opacity-10 rounded-lg shadow-md overflow-hidden">
            <div className="">
                <div className="px-4 py-2">
                    <p className="text-xl text-gray-600 dark:text-textDark">FConnect</p>
                    <div className="mt-2 grid grid-rows-2 md: grid-cols-2 gap-5 items-center justify-center">
                        <input
                            value={postInputs.caption}
                            onChange={(e) => setPostInputs({ ...postInputs, caption: e.target.value })}
                            type="text"
                            name="caption"
                            id="caption"
                            className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 col-span-2"
                            placeholder={`Hi ${currentUser.firstName}! How are you today?`}
                            required
                        />
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="postFile"
                            name="postFile"
                            type="file"
                            accept=".jpg, .jpeg, .png, .mp4"
                            multiple
                            onChange={(e) => handleUploadFile(e)}
                        />
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="text-white bg-blue-600 focus:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                        >
                            Posting
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posting;
