import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { unwrapResult } from "@reduxjs/toolkit";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import avatar from "~/assets/images/avatar_default.webp";
import { checkLike, getComment, like } from "~/features/postSlice";
import { CommentForm } from "../forms";

function CommentItem({ comment, children, handleClick }) {
  const post = useSelector((state) => state.post.post);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const comments = useSelector((state) => state.post.comments);
  const [isLike, setLike] = useState(false);
  const [show, setShow] = useState(false);
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const action = checkLike({ postId: comment.id, likeType: 1 });
      const result = unwrapResult(await dispatch(action));
      setLike(result.isLike);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = async () => {
    if (!isLoggedIn) {
      return navigate("/account/login");
    }
    const action = like({ postId: comment.id, likeType: 1 });
    await dispatch(action);
    const commentsAction = getComment({ postId: postId });
    await dispatch(commentsAction);
    setLike(!isLike);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <img
          className="w-9 h-9  cursor-pointer rounded-full overflow-hidden"
          src={avatar}
          alt=""
        ></img>
        <p className="ml-4">{post.name}</p>
      </div>
      <p className="text-[13px] mt-2 ml-3">{comment.content}</p>
      <p className="text-[13px]  ml-3">
        <button
          onClick={() => {
            setShow(!show);
            console.log(typeof handleClick);
            handleClick();
          }}
          className="text-blue-500 hover:underline ml-3"
        >
          Trả lời
        </button>
        <button
          className={classNames(" hover:underline ml-3", {
            "text-blue-500": isLike,
          })}
          onClick={() => handleLike()}
        >
          <FontAwesomeIcon size="lg" icon={faThumbsUp} />
          <span className="text-blue-500 font-semibold ml-1">
            {comment.likes || 0}
          </span>
        </button>
      </p>
      <div className="ml-8">
        {comments.map((subComment, i) => {
          if (subComment.parent_id === comment.id) {
            return (
              <CommentItem
                key={i}
                comment={subComment}
                handleClick={() => {
                  setShow(!show);
                }}
              />
            );
          }
          return <div key={i}></div>;
        })}
      </div>
      {comment.parent_id === null && show && (
        <CommentForm postId={postId} parentId={comment.id} />
      )}
    </div>
  );
}

export default CommentItem;
