import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import moment from 'moment';

import EditPost from '../EditPost';
import * as postApi from '~/apis/post.api';
import { AuthContext } from '~/context/AuthContext';
import SharePost from '../SharePost';

function Post({ user, post }: any) {
    const [postData, setPostData] = useState({ ...post });
    const [postShareData, setPostShareData] = useState({});
    const { currentUser } = useContext(AuthContext);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [isShowShare, setIsShowShare] = useState(false);
    const inputTime = postData.createdAt;
    const currentTime = moment();
    const inputMoment = moment(inputTime);
    const hoursBefore = currentTime.diff(inputMoment, 'hours');
    const daysBefore = currentTime.diff(inputMoment, 'days');
    if (hoursBefore === 0) {
        const minutesDiff = currentTime.diff(inputMoment, 'minutes');
        postData.time = `${minutesDiff} minutes before`;
    }
    if (hoursBefore > 0 && daysBefore < 1) {
        const hoursDiff = currentTime.diff(inputMoment, 'hours');
        postData.time = `${hoursDiff} hours before`;
    }
    if (daysBefore >= 1) {
        const daysDiff = currentTime.diff(inputMoment, 'days');
        postData.time = `${daysDiff} days before`;
    }
    if (daysBefore > 7) {
        const formattedDate = inputMoment.format('DD-MM-YYYY');
        postData.time = formattedDate;
    }

    //delete a post
    const deletePost: any = useMutation({
        mutationFn: () => {
            return postApi.deletePost(postData.id);
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

    //like a post
    const likeAPost: any = useMutation({
        mutationFn: () => {
            return postApi.likeByUser(postData.id);
        },
    });

    useEffect(() => {
        likeAPost.isError && console.log(likeAPost.error);
        likeAPost.isError && likeAPost.error?.response?.data.mes && toast.error(likeAPost.error?.response?.data.mes);
        likeAPost.isError && !likeAPost.error?.response?.data.mes && toast.error(likeAPost.error.message);

        if (likeAPost.isSuccess && likeAPost.data.data.success) {
            toast.success(likeAPost.data.data.mes);
            setPostData({ ...postData, likes: likeAPost.data.data.data });
        }
        if (likeAPost.isSuccess && !likeAPost.data.data.success) {
            toast.error(likeAPost.data.data.mes);
        }
    }, [likeAPost.isError, likeAPost.isSuccess]);

    //unlike a post
    const unlikeAPost: any = useMutation({
        mutationFn: () => {
            return postApi.unlikeByUser(postData.id);
        },
    });

    useEffect(() => {
        unlikeAPost.isError && console.log(unlikeAPost.error);
        unlikeAPost.isError &&
            unlikeAPost.error?.response?.data.mes &&
            toast.error(unlikeAPost.error?.response?.data.mes);
        unlikeAPost.isError && !unlikeAPost.error?.response?.data.mes && toast.error(unlikeAPost.error.message);

        if (unlikeAPost.isSuccess && unlikeAPost.data.data.success) {
            toast.success(unlikeAPost.data.data.mes);
            setPostData({ ...postData, likes: unlikeAPost.data.data.data });
        }
        if (unlikeAPost.isSuccess && !unlikeAPost.data.data.success) {
            toast.error(unlikeAPost.data.data.mes);
        }
    }, [unlikeAPost.isError, unlikeAPost.isSuccess]);

    const handleShare = () => {
        setPostShareData({
            shareFrom: postData.shareFrom || postData.id,
        });
        setIsShowShare(true);
    };
    return (
        <div
            onClick={() => isShowMenu && setIsShowMenu(false)}
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
                                    <Link to={'/profile/' + user.id}>{user.fullName || 'Username'}</Link>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{`${postData.time} | ${postData.postViewer}`}</div>
                                </div>
                            </div>
                            {currentUser.id == postData.userId && (
                                <div className="relative">
                                    <i
                                        onClick={() => setIsShowMenu(!isShowMenu)}
                                        className="fa-solid fa-ellipsis cursor-pointer"
                                    />
                                    {isShowMenu && (
                                        <ul className="absolute right-full p-2 bg-white dark:bg-[#424242] rounded">
                                            <li
                                                onClick={() => {
                                                    setIsShowEdit(true);
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
                            {isShowEdit && <EditPost showEditPost={setIsShowEdit} post={postData} />}
                            {isShowShare && <SharePost showSharePost={setIsShowShare} data={postShareData} />}
                            <p className="mt-2">{postData.caption}</p>

                            {postData.shareFrom && (
                                <div className="mt-2 pt-2 border-t flex flex-nowrap items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Link to={'/profile/' + postData?.shareFromPost?.user?.id}>
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={
                                                    postData?.shareFromPost?.user?.avatar ||
                                                    'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/353448712_1660618624451357_885125259067810930_n.jpg?stp=dst-jpg_s851x315&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vJehIP5ofc4AX-kLl4O&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDSq0zWiMJabULBuP7JYadqQsr6JVMC2YsF_HOSLOEafA&oe=655F536C'
                                                }
                                                alt="avatar"
                                            />
                                        </Link>
                                        <div className="font-medium  dark:text-textDark">
                                            <Link to={'/profile/' + postData?.shareFromPost.user?.id}>
                                                {postData?.shareFromPost?.user?.fullName || 'Username'}
                                            </Link>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{`| ${postData?.shareFromPost?.postViewer}`}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {postData?.shareFromPost?.caption && (
                                <p className="mt-2">{postData?.shareFromPost?.caption}</p>
                            )}
                            <div className={`mt-2 grid auto-rows-auto gap-1 grid-cols-2`}>
                                {postData.images.length > 0 &&
                                    postData.images.map((image: any) => (
                                        <img
                                            key={image}
                                            className="rounded object-cover max-h-60"
                                            src={process.env.REACT_APP_SERVER_URL + image}
                                        />
                                    ))}
                                {postData?.shareFromPost?.images.length > 0 &&
                                    postData?.shareFromPost?.images.map((image: any) => (
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
                        <div className="cursor-pointer select-none">
                            {postData.likes.includes(currentUser.id) ? (
                                <div onClick={unlikeAPost.mutate}>
                                    <i className="fa-solid fa-heart text-red-600" /> {postData.likes.length || 0} likes
                                </div>
                            ) : (
                                <div onClick={likeAPost.mutate}>
                                    <i className="fa-regular fa-heart" /> {postData.likes.length || 0} likes
                                </div>
                            )}
                        </div>
                        <div>
                            <i className="fa-regular fa-comment-dots" /> 0 comments
                        </div>
                        <div onClick={handleShare} className="cursor-pointer select-none">
                            <i className="fa-regular fa-share-from-square" /> share
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
