import { useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

function Notification({ data }: any) {
    const [notify, setNotify]: any = useState(data);
    let message: any = {
        addFriend: 'want to make friend with you',
    };

    const handleClick = () => {
        const socket = io(process.env.REACT_APP_SERVER_URL || '');
        socket.emit('seenNotification', notify)
        // setNotify({ ...notify, isSeen: true });
    };
    console.log(notify);

    return (
        <Link onClick={handleClick} to={`/profile/${notify.senderId}`}>
            <div
                id="toast-notification"
                className={
                    (notify.isSeen ? 'bg-white dark:bg-opacity-5' : 'bg-slate-200 dark:bg-opacity-20') +
                    ' w-full max-w-xs p-4 text-gray-900 rounded-lg shadow dark:text-gray-300'
                }
                role="alert"
            >
                <div className="flex items-center">
                    <div className="relative inline-block shrink-0">
                        <img
                            className="w-12 h-12 rounded-full"
                            src={
                                notify.senderAvatar ||
                                'https://img.hoidap247.com/picture/question/20200508/large_1588936738888.jpg'
                            }
                            alt="Jese Leos image"
                        />
                        <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                            <i className="fa-solid fa-bell text-white" />
                            <span className="sr-only">Message icon</span>
                        </span>
                    </div>
                    <div className="ms-3 text-sm font-normal">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {notify.senderName || 'Username'}
                        </div>
                        <div className="text-sm font-normal">{message[notify.type]}</div>
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-500">a few seconds ago</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Notification;
