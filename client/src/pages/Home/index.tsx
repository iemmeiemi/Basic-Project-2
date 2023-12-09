import { useContext, useEffect, useState } from 'react';

import * as postApi from '~/apis/post.api';
import { AuthContext } from '~/context/AuthContext';
import Posting from './components/Posting';
import Post from '~/components/components/Post';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

function Home() {
    const { currentUser } = useContext(AuthContext);
    const [postsList, setPostsList]: any = useState([]);
    // Lấy danh sách post của User
    const posts: any = useMutation({
        mutationFn: () => {
            return currentUser && postApi.getAllPostNewAndInterest({ userId: currentUser.id });
        },
    });

    useEffect(() => {
        posts.isError && console.log(posts.error);
        posts.isError &&
            posts.error?.response?.data.mes &&
            toast.error(posts.error?.response?.data.mes, { autoClose: false });
        posts.isError && !posts.error?.response?.data.mes && toast.error(posts.error.message, { autoClose: false });

        if (posts.isSuccess && posts.data.data.success) setPostsList(posts.data.data.data);
        if (posts.isSuccess && !posts.data.data.success) {
            setPostsList([]);
            console.log(posts.data.data.mes);
        }
    }, [posts.isError, posts.isSuccess]);
    useEffect(() => {
        posts.mutate();
    }, []);
    return (
        <>
            {currentUser && (
                <div className="container mx-auto p-4">
                    <Posting />
                    {/* =========Start Show Post==== */}
                    {postsList.length > 0 &&
                        postsList.map((post: any) => <Post key={post.id} user={post.user} post={post} />)}
                </div>
            )}
        </>
    );
}

export default Home;
