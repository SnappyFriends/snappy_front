"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Conectados from "@/components/Conectados";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { Post } from "@/interfaces/types";
import { UserContext } from "@/context/UserContext";
import { timeAgo } from "@/helpers/timeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import VerifiedAccount from "@/components/VerifiedAccount";

interface Story {
  story_id: string;
  content: string;
  fileUrl: string;
  creation_date: string;
  expiration_date:string;
  user: { userId: string; username: string; fullname: string; profile_image: string, user_type: string };
}

const SocialFeedView = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { userData, userId } = useContext(UserContext);
  const [reaction, setReaction] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [myStories, setMyStories] = useState<Story[]>([]);
  const [currentFeed, setCurrentFeed] = useState<"following" | "forYou">("forYou")
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());


  const handleFollow = async (userTarget:string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/follow/${userId}/${userTarget}`; 
    try {
      const response = followedUsers.has(userTarget)
        ? await fetch(endpoint, { method: "DELETE" }) 
        : await fetch(endpoint, { method: "POST" }); 

      if (!response.ok) {
        throw new Error("Hubo un error al cambiar el estado de seguir.");
      }
  
      setFollowedUsers(prevState => {
        const newState = new Set(prevState);
        if (newState.has(userTarget)) {
          newState.delete(userTarget);
        } else {
          newState.add(userTarget);
        }
        return newState;
      });
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {

  const fetchFollowingUser = async (userId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/${userId}/following`)
    const followingUser = await response.json();
    return followingUser.map((user: {id: string}) => user.id)
  }

    const fetchPosts = async (feedType: "following" | "forYou", userId: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      const allPosts = await response.json();

        if(feedType === "following") {
          const followingUserId = await fetchFollowingUser(userId)
          const filterPosts = allPosts.filter((post: Post) => followingUserId.includes(post.user.id));

          setPosts(filterPosts);
        }
        else {
          setPosts(allPosts)
        }
      }

      if(userData?.id) {
        fetchPosts(currentFeed, userData.id)
      }

    const fetchStories = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories`);
      const data = await response.json();

      const currentTime = new Date().getTime();
      const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; 

      const unexpiredStories = data.filter((story: Story) => {
        const storyCreationTime = new Date(story.creation_date).getTime();
        const storyExpirationTime = new Date(story.expiration_date).getTime();

       
        return (
          story.user.userId !== userData?.id &&
          storyCreationTime >= twentyFourHoursAgo &&
          currentTime < storyExpirationTime
        );
      });

      unexpiredStories.sort((a: Story, b: Story) => {
        return new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime();
      });

      setStories(unexpiredStories);
    };

    fetchStories();
  }, [reaction, userData, currentFeed]);


  const fetchMyStories = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories/user/${userData?.id}`);
    const data = await response.json();

    const currentTime = new Date().getTime();
    const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; 
    
    const recentStories = data.filter((story: Story) => {
      const storyCreationTime = new Date(story.creation_date).getTime();
      return storyCreationTime >= twentyFourHoursAgo;
    });


    recentStories.sort((a: Story, b: Story) => {
      return new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime();
    });

    setMyStories(recentStories);
    setSelectedStory(recentStories[0]);
  }

  const handleLikeToggle = async (postId: string, isLiked: boolean) => {
    if (!userData) return;

    try {
      const post = posts.find((p) => p.post_id === postId);

      if (!post) {
        console.error("Post not found.");
        return;
      }

      const existingReaction = post.reactions.find(
        (reaction) => reaction.user.id === userData.id
      );

      if (isLiked && existingReaction) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reactions/${existingReaction.id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === postId
              ? {
                  ...post,
                  reactions: post.reactions.filter(
                    (reaction) => reaction.id !== existingReaction.id
                  ),
                }
              : post
          )
        );

        setReaction(false);
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reactions/${postId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userData.id,
              reaction: "like",
              reaction_type: "post",
            }),
          }
        );

        const newReaction = await response.json();

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === postId
              ? {
                  ...post,
                  reactions: [...post.reactions, newReaction],
                }
              : post
          )
        );

        setReaction(true);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
  };

  const closeModal = () => {
    setSelectedStory(null);
    setMyStories([]);
  };

  const handlePrevClick = () => {
    const currentList = myStories.length > 0 ? myStories : stories;
  const currentIndex = currentList.findIndex(
    (s) => s.story_id === selectedStory?.story_id
  );
  const prevIndex =
    currentIndex > 0 ? currentIndex - 1 : currentList.length - 1;
  setSelectedStory(currentList[prevIndex]);
  }

  const handleNextClick = () => {
    const currentList = myStories.length > 0 ? myStories : stories;
  const currentIndex = currentList.findIndex(
    (s) => s.story_id === selectedStory?.story_id
  );
  const nextIndex =
    currentIndex < currentList.length - 1 ? currentIndex + 1 : 0;
  setSelectedStory(currentList[nextIndex]);
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col items-center max-w-6xl px-4 md:px-8 mt-10 mx-auto">
          <div className="flex justify-center space-x-6 mb-6">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
          <button title="Ver mis historias">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
              <Image
                src={userData?.profile_image || "/user.png"}
                alt="Foto de perfil"
                width={200}
                height={200}
                className="object-cover w-full h-full"
                onClick={fetchMyStories}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center">
              <Link href={"/crear-story"}>
              <Image
                src="/addhistoria.png"
                alt="Añadir historia"
                width={20}
                height={20}
                className="object-cover"
              />
              </Link>
            </div>
          </button>
        </div>

            {stories?.slice(0, 5).map((story) => (
              <div
                key={story.story_id}
                className="relative w-14 h-14 flex flex-col items-center cursor-pointer"
                onClick={() => handleStoryClick(story)}
              >
                <Image
                  src={story.user.profile_image || "/user.png"}
                  alt={`Foto de ${story.user.username}`}
                  layout="fill"
                  className="rounded-full object-cover"
                />
             <p className="text-xs mt-14 text-center font-semibold text-ellipsis whitespace-nowrap">
  {story.user.username.length > 8 ? `${story.user.username.slice(0, 8)}...` : story.user.username}
</p>
              </div>
            ))}
          </div>
		  <div className="flex justify-between w-full max-w-md mb-6 border-b">
						<button 
              className={`flex-1 py-2 text-center ${
                currentFeed === "forYou" ? "text-black font-bold border-b-2 border-black" : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setCurrentFeed("forYou")}
              >
                Para ti
						</button>
					<button 
            className={`flex-1 py-2 text-center ${
              currentFeed === "following" ? "text-black font-bold border-b-2 border-black" : "text-gray-500 hover:text-black"}`}
              onClick={() => setCurrentFeed("following")}
            >
                Siguiendo
						</button>
					</div>
          <div className="w-full max-w-md space-y-4">
            {posts.map((post) => {
              const isLiked = post.reactions.some(
                (reaction) => reaction.user.id === userData?.id
              );

              return (
                <div key={post.post_id} className="w-full max-w-md space-y-4 mb-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center mb-5">
                      <Link
                        href={
                          post.user.username === userData?.username
                            ? "/miperfil"
                            : `/perfil/${post.user.username}`
                        }
                      >
                        <div className="relative w-10 h-10">
                          <Image
                            src={post.user.profile_image}
                            alt={post.user.username}
                            layout="fill"
                            className="rounded-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="ml-4">
                        <Link
                          href={
                            post.user.username === userData?.username
                              ? "/miperfil"
                              : `/perfil/${post.user.username}`
                          }
                        >
                          <h2 className="text-sm font-semibold">
                            {post.user.username} {post.user.user_type === "premium" ? <VerifiedAccount /> : ""}
                          </h2>
                        </Link>
                        <Link href={`/publicacion/${post.post_id}`}>
                          <p className="text-xs text-gray-500">
						  {timeAgo(post.creation_date)}{" "}
                          </p>
                        </Link>
                      </div>
                    </div>
                    <button
  onClick={() => handleFollow(post.user.id)}
  className={`px-4 py-2 rounded-lg transition-colors ${followedUsers.has(post.user.id) ? "bg-gray-300 text-black" : "bg-blue-500 text-white" }`}
>
  {followedUsers.has(post.user.id) ? "Dejar de seguir" : "Seguir"}
</button>


                  </div>

                  <Link href={`/publicacion/${post.post_id}`}>
                    <div className="relative w-full h-80">
                      <Image
                        src={post.fileUrl}
                        alt="Post image"
                        layout="fill"
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </Link>

                  <p className="text-sm text-gray-700">{post.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <p
                        className={`text-xs cursor-pointer ${
                          isLiked ? "text-red-500" : "text-gray-500"
                        }`}
						onClick={() => handleLikeToggle (post.post_id, isLiked)}
												style={{
													transform: "scale(1)",
													transition: "transform 0.2s",
												}}
												onMouseEnter={(e) =>
													(e.currentTarget.style.transform = "scale(1.1)")
												}
												onMouseLeave={(e) =>
													(e.currentTarget.style.transform = "scale(1)")
												}
                      >
                        <FontAwesomeIcon
                          icon={isLiked ? faSolidHeart : faRegHeart}
                          size="lg"
                        /> 
						{" "}
						{post.reactions.length}
                      </p>
                      <Link href={`/publicacion/${post.post_id}`}>
                        <p className="text-xs text-gray-500">
                          <FontAwesomeIcon icon={faComment} size="lg" />{" "} {post.comments.length}
                        </p>
                      </Link>
                    </div>
                    <Link href={`/publicacion/${post.post_id}`}>
                      <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs">
                        Comentar
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
			

        {selectedStory && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-3xl h-120 flex flex-col relative">
      <button
        className="absolute top-2 right-2 text-black font-bold"
        onClick={closeModal}
      >
        X
      </button>
      <div className="flex justify-between items-center h-96">
        <button
          className="text-lg font-bold text-gray-700 hover:text-black"
          onClick={handlePrevClick}
        >
          &#8249;
        </button>
        <div className="relative w-4/5 h-96">
          <Image
            src={selectedStory.fileUrl}
            alt="Story image"
            layout="fill"
            className="rounded-lg object-cover"
          />
        </div>
        <button
          className="text-lg font-bold text-gray-700 hover:text-black"
          onClick={handleNextClick}
        >
          &#8250;
        </button>
      </div>
      <div className="mt-4 flex flex-col items-center text-center">
        <h3 className="text-lg font-bold">{selectedStory.user.username} {selectedStory.user.user_type === "premium" ? <VerifiedAccount /> : ""}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {timeAgo(selectedStory.creation_date)}
        </p>
        <p className="text-sm max-w-lg">{selectedStory.content}</p>
      </div>
    </div>
  </div>
)}

		 <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
          <Conectados />
        </div>
      </div>
    </>
  );
};

export default SocialFeedView;
