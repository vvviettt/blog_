import { useEffect, useState } from "react";
import { PostForm } from "~/components/forms";
import { toast } from "react-toastify";
import { getPost, updatePost } from "~/features/postSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate, useSearchParams } from "react-router-dom";

function Update() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  useEffect(() => {
    (async () => {
      const action = getPost({ id: postId });
      const result = unwrapResult(await dispatch(action));
      setContent(result.post.content);
      setTitle(result.post.title);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      return toast.error("Tiêu đề đang trống");
    }
    if (!content) {
      return toast.error("Nội dung đang trống");
    }
    const action = updatePost({ id: postId, title: title, content: content });
    const result = unwrapResult(await dispatch(action));
    if (result.error) {
      return toast.error(result.message);
    }
    toast.success("Chỉnh sửa thành công");
    navigate("/user/posts");
  };
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

export default Update;
