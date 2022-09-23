import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";

import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';

import {GoVerified} from "react-icons/go";
import {Md1K, MdOutlineCancel} from "react-icons/md";
import {BsFillPlayFill} from "react-icons/bs";
import {HiVolumeUp, HiVolumeOff} from "react-icons/hi";

import useAuthStore from "../../store/authStore";

import {BASE_URL} from "../../utils";
import {Video} from "../../types";

import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

interface IProps {
    postDetails: Video
}

const Detail = ({postDetails}: IProps) => {
    const [post, setPost] = useState(postDetails);
    const [playing, setPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);

    const {userProfile} = useAuthStore();

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    if(!post) {
        return null;
    }

    const onVideoClick = () => {
        if(playing) {
            videoRef?.current?.pause();
            setPlaying(false);
        }else{
            videoRef?.current?.play();
            setPlaying(true);
        }
    }

    useEffect(() => {
        if(post && videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }
    }, [post, isVideoMuted]);

    return (
        <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
            <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
                <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
                    <p className="cursor-pointer" onClick={() => router.back() }>
                        <MdOutlineCancel className="text-white text-[35px]" />
                    </p>
                </div>
                <div className="relative">
                    <div className="lg:h-[100vh] h-[60vh]">
                        <video
                            src={post.video.asset.url}
                            ref={videoRef}
                            loop
                            className="h-full cursor-pointer"
                            onClick={onVideoClick}
                        >

                        </video>
                    </div>

                    <div className="absolute top-[45%] left-[45%] cursor-pointer">
                        {!playing && (
                            <button>
                                <BsFillPlayFill
                                    className="text-white text-6xl lg:text-8xl"
                                    onClick={onVideoClick}
                                />
                            </button>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
                    {isVideoMuted ? (
                        <button onClick={() => setIsVideoMuted(false)}>
                            <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
                        </button>
                    ) : (
                        <button onClick={() => setIsVideoMuted(true)}>
                            <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
                        </button>
                    )}
                </div>
            </div>

            <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
                <div className="lg:mt-20 mt-10">

                    <div className="flex gap-3 p-2 cursor-pointer fon-semibold rounded items-center">
                        <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
                            <Link href="/">
                                <>
                                    <Image
                                        width={62} height={62} alt="profile photo" layout="responsive"
                                        className="rounded-full"
                                        src={post.postedBy.image}
                                    />
                                </>
                            </Link>
                        </div>
                        <div>
                            <Link href="/">
                                <div className="flex flex-col gap-2">
                                    <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                                        {post.postedBy.userName}
                                        {``}
                                        <GoVerified className="text-blue-400 text-md " />
                                    </p>
                                    <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                                        {post.postedBy.userName}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <p className="px-10 text-lg font-bold text-gray-600">
                        Title: "{post.caption}"
                    </p>

                    <div className="mt-10 px-10">
                        {userProfile && (
                            <LikeButton

                            />
                        )}
                    </div>

                    <Comments

                    />
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async ({params: {id}}: {params: {id: string}}) => {
    const {data} = await axios.get(`${BASE_URL}/api/post/${id}`);

    return {
        props: {
            postDetails: data
        }
    }
}

export default Detail;