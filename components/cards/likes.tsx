"use client"

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { addLikeToThread, hasUserLikedThread, likeCount, unLikeToThread } from "@/lib/actions/thread.actions";
import path from "path";
interface LikesProps{
threadId:string
userId:string


}





const Likes:React.FC<LikesProps> = ({threadId,userId}) => {

    const [like, setLike] = useState(false);
    const [likecount,setLikeCount]= useState(0)
  async function setlikestatefunction() {
    
    const likeState = await hasUserLikedThread(threadId,userId)
 

    if (likeState){

        setLike(true)
        
        } 
        
  } 

async function LikeNum() {
  const likeNum= await likeCount(threadId,userId)
  setLike(likeNum)
}

  useEffect(() => {
    setlikestatefunction()
    LikeNum();
}, [threadId, userId])



    const likeFunction = async  ()=> {

      
        like ? await  unLikeToThread(threadId,userId) : addLikeToThread(threadId,userId);
        setLike(!like);

    }
    



    return ( 
    
    <Button  onClick={likeFunction} variant="link" className=" flex py-0 px-0 m-0 h-15 w-15 gap-1.5"    >


  {like ?<HeartIcon height={24} width={24} color="blue" fill="blue"/>:<HeartIcon height={24} width={24} color="gray"/>} {like}


    </Button> )
}
export default Likes;