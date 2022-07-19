import axiosClient from "./axiosClient";

class PostApi {
  uploadImage = ({ file }) => {
    const url = "/upload";
    return axiosClient.post(url, { file });
  };

  uploadPost = ({ title, content }) => {
    const url = "/upload/post";
    return axiosClient.post(url, { title, content });
  };
  getListPostsForMe = () => {
    const url = `/user/posts`;
    return axiosClient.get(url);
  };

  deletePostsForMe = ({ id }) => {
    const url = `/user/post/delete`;
    return axiosClient.post(url, { id: id });
  };

  getPost = ({ id }) => {
    const url = `/user/post/getPost?id=${id}`;
    return axiosClient.get(url);
  };

  getOnePost = ({ id }) => {
    const url = `/user/post?id=${id}`;
    return axiosClient.get(url);
  };

  updatePost = ({ title, content, id }) => {
    const url = `/user/post/updatePost`;
    return axiosClient.post(url, { id: id, title: title, content: content });
  };

  getLikes = ({ id }) => {
    const url = `/user/getLike?id=${id}`;
    return axiosClient.get(url, { id: id });
  };

  checkLike = ({ postId, likeType }) => {
    const url = `/user/post/checkLike?like_type=${likeType}&post_id=${postId}`;
    return axiosClient.get(url);
  };

  updateLike = ({ postId, likeType }) => {
    const url = `/user/post/like?like_type=${likeType}&post_id=${postId}`;
    return axiosClient.post(url);
  };

  addComment = ({ content, postId, parentId }) => {
    const url = `/user/post/addComment`;
    return axiosClient.post(url, {
      postId: postId,
      content: content,
      parentId: parentId,
    });
  };

  getComment = ({ postId }) => {
    const url = `/user/post/getComment?postId=${postId}`;
    return axiosClient.get(url);
  };

  getAllPosts = () => {
    const url = `/user/post/getAllPosts`;
    return axiosClient.get(url);
  };
}

const postApi = new PostApi();
export default postApi;
