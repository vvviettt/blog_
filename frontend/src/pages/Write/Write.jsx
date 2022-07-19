import { useEffect, useState } from "react";
import { PostForm } from "~/components/forms";
import { toast } from "react-toastify";
import { uploadPost } from "~/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

function Write() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      return toast.error("Tiêu đề đang trống");
    }
    if (!content) {
      return toast.error("Nội dung đang trống");
    }
    const action = uploadPost({ title: title, content: content });
    const result = unwrapResult(await dispatch(action));
    if (result.error) {
      return toast.error(result.message);
    }
    toast.success("Đăng tải thành công");
    navigate("/user/posts");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return (
    <>
      <PostForm
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Write;
