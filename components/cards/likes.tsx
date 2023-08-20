"use client"



import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { addLikeToThread, hasUserLikedThread, likeCount, unLikeToThread } from "@/lib/actions/thread.actions";
import path from "path";
import { number } from "zod";
import { ObjectId } from "mongoose";
interface LikesProps{
threadId:string
userId:string


}
type LikesType = {
  id? : ObjectId,
  userId? : string,
  threadtId : string,
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
  const result = await likeCount(threadId, userId);
      setLikeCount(result.likeCount);

}

  useEffect(() => {
     LikeNum();
    setlikestatefunction()
   
}, [threadId, userId])



    const likeFunction = async  ()=> {

      
        like ? await  unLikeToThread(threadId,userId) : addLikeToThread(threadId,userId);
        setLike(!like);

    }
    



    return ( 
    
    <Button  onClick={likeFunction} variant="link" className=" flex py-0 px-0 m-0 h-15 w-15 gap-1.5"    >


  {like ?<HeartIcon height={24} width={24} color="blue" fill="blue"/>:<HeartIcon height={24} width={24} color="gray"/>} <span>{likecount}</span>


    </Button> )
}
export default Likes;