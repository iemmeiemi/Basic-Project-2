import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import moment from 'moment';

import EditPost from '../EditPost';
import * as postApi from '~/apis/post.api';
import { log } from 'console';
import { AuthContext } from '~/context/AuthContext';

function Post({ user, post }: any) {
    const { currentUser } = useContext(AuthContext);
    const [isShowMenu, setShowMenu] = useState(false);
    const [isShowEdit, setShowEdit] = useState(false);
    const inputTime = post.createdAt;
    const currentTime = moment();
    const inputMoment = moment(inputTime);
    const hoursBefore = currentTime.diff(inputMoment, 'hours');
    const daysBefore = currentTime.diff(inputMoment, 'days');
    if (hoursBefore === 0) {
        const minutesDiff = currentTime.diff(inputMoment, 'minutes');
        post.time = `${minutesDiff} minutes before`;
    }
    if (hoursBefore > 0 && daysBefore < 1) {
        const hoursDiff = currentTime.diff(inputMoment, 'hours');
        post.time = `${hoursDiff} hours before`;
    }
    if (daysBefore >= 1) {
        const daysDiff = currentTime.diff(inputMoment, 'days');
        post.time = `${daysDiff} days before`;
    }
    if (daysBefore > 7) {
        const formattedDate = inputMoment.format('DD-MM-YYYY');
        post.time = formattedDate;
    }

    //posting a post
    const deletePost: any = useMutation({
        mutationFn: () => {
            return postApi.deletePost(post.id);
        },
    });

    useEffect(() => {
        deletePost.isError && console.log(deletePost.error);
        deletePost.isError && deletePost.error?.response?.data.mes && toast.error(deletePost.error?.response?.data.mes);
        deletePost.isError && !deletePost.error?.response?.data.mes && toast.error(deletePost.error.message);

        if (deletePost.isSuccess && deletePost.data.data.success) {
            toast.success(deletePost.data.data.mes);
            window.location.reload();
        }
        if (deletePost.isSuccess && !deletePost.data.data.success) {
            toast.error(deletePost.data.data.mes);
        }
    }, [deletePost.isError, deletePost.isSuccess]);
    console.log(deletePost.data?.data);

    return (
        <div
            onClick={() => isShowMenu && setShowMenu(false)}
            className="w-full mx-auto my-5 bg-white dark:bg-opacity-10 rounded-lg shadow-md overflow-hidden"
        >
            <div className="border-t border-gray-200 dark:border-gray-600 dark:text-textDark">
                <div className="border-t border-gray-200 dark:border-gray-600">
                    <div className="p-4">
                        <div className="flex flex-nowrap items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link to={'/profile/' + user.id}>
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={
                                            user.avatar ||
                                            'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/353448712_1660618624451357_885125259067810930_n.jpg?stp=dst-jpg_s851x315&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vJehIP5ofc4AX-kLl4O&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDSq0zWiMJabULBuP7JYadqQsr6JVMC2YsF_HOSLOEafA&oe=655F536C'
                                        }
                                        alt="avatar"
                                    />
                                </Link>
                                <div className="font-medium  dark:text-textDark">
                                    <Link to={'/profile/' + user.id}>{user.fullName}</Link>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{`${post.time} | ${post.postViewer}`}</div>
                                </div>
                            </div>
                            {currentUser.id == post.userId && (
                                <div className="relative">
                                    <i
                                        onClick={() => setShowMenu(!isShowMenu)}
                                        className="fa-solid fa-ellipsis cursor-pointer"
                                    />
                                    {isShowMenu && (
                                        <ul className="absolute right-full p-2 bg-white dark:bg-[#424242] rounded">
                                            <li
                                                onClick={() => {
                                                    setShowEdit(true);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                edit
                                            </li>
                                            <li onClick={deletePost.mutate} className="cursor-pointer">
                                                delete
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="mt-5">
                            {isShowEdit && <EditPost showEditPost={setShowEdit} post={post} />}
                            <p className="mt-2">{post.caption}</p>
                            <div className={`mt-2 grid auto-rows-auto gap-1 grid-cols-2`}>
                                {post.images.length > 0 &&
                                    post.images.map((image: any) => (
                                        <img
                                            key={image}
                                            className="rounded object-cover max-h-60"
                                            src={process.env.REACT_APP_SERVER_URL + image}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-t p-4 flex gap-5 justify-between lg:justify-start">
                        <div>
                            <i className="fa-regular fa-heart" /> {post.likes.length || 0} likes
                        </div>
                        <div>
                            <i className="fa-regular fa-comment-dots" /> 0 comments
                        </div>
                        <div>
                            <i className="fa-regular fa-share-from-square" /> share
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
