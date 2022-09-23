import React, {useState, useEffect} from 'react';

import {MdFavorite} from "react-icons/md";

import useAuthStore from "../store/authStore";

const LikeButton = () => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const {userProfile} = useAuthStore();


    return (
        <div className="gap-6">
            <div>
                
            </div>
        </div>
    );
}

export default LikeButton;