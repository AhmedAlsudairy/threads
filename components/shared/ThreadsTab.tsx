import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";
import { userInfo } from "os";
import { currentUser } from "@clerk/nextjs";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    imageUrl?:string
    videoUrl:string
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  userInfo:string;
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
    redirect("/");
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.threads.map((thread) => (
        <ThreadCard
        userInfo={userInfo._id}
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}        
          imageUrl={thread.imageUrl}
          videoUrl={thread.videoUrl}

          
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
