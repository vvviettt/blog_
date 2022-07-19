import { useEffect, useState } from "react";
import avatar from "~/assets/images/avatar_default.webp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkLike, getComment, getOnePost, like } from "~/features/postSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { CommentForm } from "~/components/forms";
import CommentItem from "~/components/CommentItem";

function Post() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const post = useSelector((state) => state.post.post);
  const likes = useSelector((state) => state.post.likes);
  const comments = useSelector((state) => state.post.comments);
  const isLike = useSelector((state) => state.post.isLike);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const action = getOnePost({ id: postId });
      const checkAction = checkLike({ likeType: 2, postId: postId });
      const commentsAction = getComment({ postId: postId });
      await dispatch(commentsAction);
      await dispatch(checkAction);
      await dispatch(action);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = async () => {
    if (!isLoggedIn) {
      return navigate("/account/login");
    }
    const action = like({ likeType: 2, postId: postId });
    await dispatch(action);
  };
  if (post.error) {
    return (
      <div className="max-w-[1140px] m-auto">
        <h2 className="text-red-600">{post.message}</h2>
      </div>
    );
  }
  return (
    <div className="max-w-[1140px] m-auto">
      <div>
        <div className=" flex mt-8 mb-12">
          <div>
            <div>
              <h2 className="text-[30px] font-semibold">{post.title}</h2>
              <div className="flex items-center py-2">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <img
                      className="w-9 h-9  cursor-pointer rounded-full overflow-hidden"
                      src={avatar}
                      alt=""
                    ></img>
                    <p className="ml-4">
                      {post.name} <span className="m-4">{post.create_at}</span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        handleLike();
                      }}
                      className="p-2 hover:bg-slate-300 rounded-full"
                    >
                      <FontAwesomeIcon
                        size="lg"
                        color={isLike ? "red" : ""}
                        icon={faThumbsUp}
                      />
                    </button>
                    <span>{likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <p className="text-center pt-4 text-[16px] font-bold">The End</p>
      <div className="py-5 pb-16">
        <h2 className="font-semibold text-[20px]">Bình luận</h2>
        <div className="border border-solid border-stone-400 rounded-lg py-6 px-5 mt-4">
          <div className="flex items-center">
            <div>
              <img
                className="w-9 h-9  cursor-pointer rounded-full overflow-hidden"
                src={avatar}
                alt=""
              ></img>
            </div>
            <p className="pl-4">{post.name}</p>
          </div>
          <CommentForm postId={postId} parentId={null} />
        </div>
        <div className="border border-solid border-stone-400 rounded-lg py-6 px-5 mt-4">
          {comments.length === 0 && (
            <p className="text-center">Chưa có bình luận nào</p>
          )}
          {comments.map((comment, index) => {
            if (comment.parent_id === null) {
              return (
                <CommentItem
                  comment={comment}
                  handleClick={() => {}}
                  key={index}
                ></CommentItem>
              );
            }
            return <div key={index}></div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
