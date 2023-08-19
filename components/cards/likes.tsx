"use client"

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { addLikeToThread, hasUserLikedThread, unLikeToThread } from "@/lib/actions/thread.actions";
import path from "path";
import axios from "axios";
interface LikesProps{
threadId:string
userId:string


}





const Likes:React.FC<LikesProps> = ({threadId,userId}) => {

    const [like, setLike] = useState(false);
  async function setlikestatefunction(threadId:string,userId:string) {
    const likeState = await hasUserLikedThread(threadId,userId)
    console.log(threadId)

    if (likeState){

        setLike(true)
        
        } 
        
  } 

  setlikestatefunction(threadId,userId)

    const likeFunction = async  ()=> {

      
        like ? await  unLikeToThread(threadId,userId) : addLikeToThread(threadId,userId);
        setLike(!like);

    }
    



    return ( 
    
    <Button  onClick={likeFunction} variant="ghost" className="flex object-contain" >


  {like ?<HeartIcon size={20} color="blue" fill="blue"/>:<HeartIcon size={24} color="gray"/>} 


    </Button> )
}
export default Likes;