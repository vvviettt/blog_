import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addComment } from "~/features/postSlice";

function CommentForm({ postId, parentId }) {
  const [comment, setComment] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (data.comment === "") {
      return toast.error("Chưa nhập bình luận");
    }
    const action = addComment({
      content: data.comment,
      postId: postId,
      parentId: parentId,
    });
    const result = unwrapResult(await dispatch(action));
    console.log(result);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 flex">
      <input
        {...register("comment")}
        className="border-b border-stone-400 outline-none px-3 mx-5 flex-grow"
      ></input>
      <button
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type="submit"
        className=" bg-[#007bff] py-2 px-4 text-white rounded-lg"
      >
        Gửi
      </button>
    </form>
  );
}

export default CommentForm;
