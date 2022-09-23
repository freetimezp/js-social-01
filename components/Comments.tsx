import React, {Dispatch, SetStateAction} from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {GoVerified} from "react-icons/go";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";

interface IProps {
    isPostingComment: boolean;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    addComment: (e: React.FormEvent) => void;
    comments: IComment[]
}

interface IComment {
    comment: string;
    lenght?: number;
    _key: string;
    postedBy: {
        _ref: string;
        _id: string;
    }
}

const Comments = ({isPostingComment,comment, setComment, addComment, comments }: IProps) => {
    const {userProfile}: any = useAuthStore();

    return (
        <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 pb-[100px] lg:pb-0">
            <div className="ovelflow-scroll lg:h-[475px]">
                {comments?.length ? (
                    <div>

                    </div>
                ) : (
                    <NoResults text="No comments yet" />
                )}
            </div>

            {userProfile && (
                <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
                    <form onSubmit={addComment} className="flex gap-4">
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            type="text"
                            placeholder="Add comment..."
                            className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px]
                            border-gray-300 focus:outline-none focus:border-2 focus:border-gray-400 flex-1 rounded-lg"
                        />
                        <button
                            className="text-md text-gray-700 bg-gray-300 px-5 rounded-lg"
                            onClick={addComment}
                        >
                            {isPostingComment ? 'Commenting...' : 'Comment'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Comments;





















