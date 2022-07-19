import { Link } from "react-router-dom";
import banner from "~/assets/images/banner.jpg";
import avatar from "~/assets/images/avatar_default.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { getAllPosts } from "~/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.allPosts);
  useEffect(() => {
    (async () => {
      const action = getAllPosts();
      await dispatch(action);
    })();
  }, []);
  return (
    <div>
      <div>
        <img src={banner} alt="" />
      </div>
      <div className="max-w-[1140px] m-auto">
        <h2 className="text-2xl mt-5">Tất cả bài viết</h2>
        {posts.map((post, index) => {
          return (
            <div
              key={index}
              className="flex justify-between border-b border-solid border-stone-500 py-3"
            >
              <div>
                <Link
                  className="text-blue-500 hover:underline"
                  to={`/p?postId=${post.id}`}
                >
                  {post.title}
                </Link>
                <div className="flex items-center">
                  <img
                    className="w-6 h-6  cursor-pointer rounded-full overflow-hidden"
                    src={avatar}
                    alt=""
                  ></img>
                  <p className="ml-4">{post.name}</p>
                </div>
              </div>
              <div>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span className="ml-3">{post.likes || 0}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
