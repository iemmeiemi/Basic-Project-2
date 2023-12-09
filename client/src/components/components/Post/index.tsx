import { Link } from 'react-router-dom';

const moment = require('moment');
function Post({ user, post }: any) {
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

    return (
        <div className="w-full mx-auto my-5 bg-white dark:bg-opacity-10 rounded-lg shadow-md overflow-hidden">
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
                            <i className="fa-solid fa-ellipsis cursor-pointer" />
                        </div>
                        <div className="mt-5">
                            <p>{post.caption}</p>
                            <div className={`mt-2 grid gap-1 grid-cols-2 grid-rows-${Math.round(post.images.length / 2)}`}>
                                {post.images.length > 0 &&
                                    post.images.map((image: any) => (
                                        <img
                                            key={image}
                                            className="rounded object-cover"
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
