import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import * as postApi from '~/apis/post.api';
import { AuthContext } from '~/context/AuthContext';

function EditPost({ showEditPost, post }: any) {
    const { currentUser }: any = useContext(AuthContext);
    const postViewerOptions = ['Everyone', 'Friends', 'Only me'];
    const [postInputs, setPostInputs] = useState({
        userId: currentUser.id,
        caption: post.caption,
        hasTag: '',
        postViewer: postViewerOptions[0],
        files: [],
        shareFrom: null,
    });
    //posting a post
    const editPost: any = useMutation({
        mutationFn: (formData) => {
            return postApi.editPost(post.id, formData);
        },
    });

    useEffect(() => {
        editPost.isError && console.log(editPost.error);
        editPost.isError && editPost.error?.response?.data.mes && toast.error(editPost.error?.response?.data.mes);
        editPost.isError && !editPost.error?.response?.data.mes && toast.error(editPost.error.message);

        if (editPost.isSuccess && editPost.data.data.success) toast.success(editPost.data.data.mes);
        if (editPost.isSuccess && !editPost.data.data.success) {
            toast.error(editPost.data.data.mes);
        }
    }, [editPost.isError, editPost.isSuccess]);

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
        editPost.mutate(formData);
    };

    return (
        <div className="w-full mx-auto overflow-hidden">
            <div className="">
                <div className="grid grid-rows-2 md:grid-cols-5 gap-5 items-center justify-center">
                    <input
                        value={postInputs.caption}
                        onChange={(e) => setPostInputs({ ...postInputs, caption: e.target.value })}
                        type="text"
                        name="caption"
                        id="caption"
                        className="bg-white bg-opacity-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-black dark:bg-opacity-20 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-600 col-span-4"
                        placeholder={`New caption`}
                        required
                    />
                    <select
                        onChange={(e) =>
                            setPostInputs({ ...postInputs, postViewer: postViewerOptions[+e.target.value] })
                        }
                        value={postViewerOptions.indexOf(post.postViewer)}
                        id="postViewer"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {postViewerOptions.map((el, index) => (
                            <option key={index} value={index}>
                                {el}
                            </option>
                        ))}
                    </select>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 col-span-3"
                        id="postFile"
                        name="postFile"
                        type="file"
                        accept=".jpg, .jpeg, .png, .mp4"
                        multiple
                        onChange={(e) => handleUploadFile(e)}
                    />
                    <button
                        onClick={() => showEditPost(false)}
                        type="button"
                        className="text-white bg-gray-600 focus:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="text-white bg-blue-600 focus:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditPost;
