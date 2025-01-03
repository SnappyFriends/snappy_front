"use client";

import Image from "next/image";

interface Post {
  post_id: string;
  content: string;
  creation_date: string;
  fileUrl: string;
  user: {
    username: string;
    profile_image: string;
    user_type: string;
  };
  reactions: Array<{
    id: string;
    user: {
      username: string;
      profile_image: string;
      user_type: string;
    };
  }>;
  comments: Array<{ content: string; username: string }>;
}

interface PostDetailsProps {
  post: Post;
  close: () => void;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, close }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <button
          className="absolute top-2 right-2 text-white font-bold text-2xl w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-600 focus:outline-none"
          onClick={close}
        >
          X
        </button>

        <div className="mt-4">
          <div className="flex justify-center mb-4">
            <div className="w-96 h-96">
              <Image
                src={post.fileUrl}
                alt={`Imagen del post ${post.post_id}`}
                width={400}
                height={400}
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
          </div>

          <h3 className="text-lg font-bold">{post.content}</h3>
          <p className="text-sm text-gray-500">
            Publicado el: {new Date(post.creation_date).toLocaleDateString()}
          </p>

          <hr className="my-2" />

          <div>
            <h4 className="font-semibold mb-2">Reacciones</h4>
            <div className="space-x-2">
              {post.reactions.length > 0 ? (
                post.reactions.map((reaction) => (
                  <div
                    key={reaction.id}
                    className="flex items-center space-x-2"
                  >
                    <Image
                      src={reaction.user.profile_image}
                      alt="User profile"
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    />
                    <span>{reaction.user.username}</span>
                  </div>
                ))
              ) : (
                <p>No hay reacciones aún.</p>
              )}
            </div>
          </div>

          <hr className="my-2" />

          <div>
            <h4 className="font-semibold mb-2">Comentarios</h4>
            <div className="space-y-2">
              {post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="flex flex-col">
                      <p className="font-semibold">{comment.username}</p>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay comentarios aún.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
