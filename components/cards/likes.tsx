'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { HeartIcon } from 'lucide-react';
import {
  addLikeToThread,
  hasUserLikedThread,
  likeCount,
} from '@/lib/actions/thread.actions';
import path from 'path';
import { number } from 'zod';
import { ObjectId } from 'mongoose';
import { useRouter } from 'next/navigation';
import { Loader } from '../ui/loader';

interface LikesProps {
  threadId: string;
  userId: string;
}

const Likes: React.FC<LikesProps> = ({ threadId, userId }) => {
  const Router = useRouter();
  const [like, setLike] = useState(false);
  const [likecount, setLikeCount] = useState(0);

  async function setlikestatefunction() {

    const likeState = await hasUserLikedThread(threadId, userId);

    setLike(likeState);
  }

  async function LikeNum() {

    const result = await likeCount(threadId, userId);
    setLikeCount(result.likeCount);
  }
  const likeFunction = async () => {

    await addLikeToThread(threadId, userId);
    setLike(!like);
  };

  useEffect(() => {
    LikeNum();
    setlikestatefunction();
  }, [threadId, userId, likeFunction]);

 
    return (
      <Button
        onClick={likeFunction}
        variant="link"
        className=" flex py-0 px-0 m-0 h-15 w-15 gap-1.5"
      >
        {like ? (
          <HeartIcon height={24} width={24} color="blue" fill="blue" />
        ) : (
          <HeartIcon height={24} width={24} color="gray" />
        )}
        <span>{likecount}</span>
      </Button>
    );
  
};
export default Likes;
