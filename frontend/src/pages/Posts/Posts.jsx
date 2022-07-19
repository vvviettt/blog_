import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "~/components/PostItem/PostItem";
import { getListPostsForMe } from "~/features/postSlice";

function Post() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.postForMe);
  useEffect(() => {
    (async () => {
      const action = getListPostsForMe();
      await dispatch(action);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (posts.length > 0) {
    return (
      <div className="max-w-[1140px] m-auto py-4">
        {posts.map((post, index) => {
          return <PostItem key={index} post={post} />;
        })}
      </div>
    );
  }
  return (
    <div className="max-w-[1140px] m-auto py-4">
      <h2>Chưa có bài viết nào</h2>
    </div>
  );
}

export default Post;
