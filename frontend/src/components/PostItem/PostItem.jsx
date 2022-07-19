import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch } from "react-redux";
import { deletePostsForMe } from "~/features/postSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
function PostItem({ post }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const action = deletePostsForMe({ id: post.id });
            const result = unwrapResult(await dispatch(action));
            toast.success(result.message);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const date = new Date(post.update_at);

  const updateAt =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return (
    <div className=" flex justify-between border-b border-solid border-gray-500 px-4 py-2">
      <div>
        <Link
          className="text-[18px] font-semibold text-blue-500 hover:underline"
          to={`/p?postId=${post.id}`}
        >
          {post.title}
        </Link>
        <p>Cập nhật lần cuối : {updateAt}</p>
      </div>
      <div>
        <div className="flex">
          <Link
            to={`/user/updatePost?postId=${post.id}`}
            className="py-2 px-5 ml-4 bg-teal-600 text-white rounded-xl"
          >
            Sửa
          </Link>
          <button
            onClick={() => {
              handleDelete();
            }}
            className="py-2 px-5 ml-4 bg-red-500 text-white rounded-xl "
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
