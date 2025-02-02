import React from 'react';
import { useSelector } from 'react-redux';
import Friend from '../../components/Friend.jsx';

const FriendListWidget = () => {
    const friends = useSelector((state) => Array.isArray(state.user.friends) ? state.user.friends : []); // Ensure friends is an array

    return (
        <div>
            {friends.map((friend) => (
                <Friend
                    key={friend._id}
                    friendId={friend._id}
                    name={friend.name}
                    subtitle={friend.subtitle}
                    userPicturePath={friend.userPicturePath}
                />
            ))}
        </div>
    );
};

export default FriendListWidget;