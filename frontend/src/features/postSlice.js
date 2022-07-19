import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postApi from "~/api/postApi";

export const uploadImage = createAsyncThunk(
  "post/uploadImage",
  async (params) => {
    const upload = await postApi.uploadImage(params);
    return upload;
  }
);

export const uploadPost = createAsyncThunk(
  "post/uploadPost",
  async (params) => {
    const result = await postApi.uploadPost(params);
    return result;
  }
);

export const getListPostsForMe = createAsyncThunk(
  "post/getListPosts",
  async () => {
    const result = await postApi.getListPostsForMe();
    return result;
  }
);

export const like = createAsyncThunk("post/like", async (params) => {
  const result = await postApi.updateLike({
    postId: params.postId,
    likeType: params.likeType,
  });
  return result;
});

export const getPost = createAsyncThunk("post/getPost", async (params) => {
  const result = await postApi.getPost(params);
  return result;
});

export const getOnePost = createAsyncThunk(
  "post/getOnePost",
  async (params) => {
    const result = await postApi.getOnePost(params);
    return result;
  }
);

export const deletePostsForMe = createAsyncThunk(
  "post/delete",
  async (params, thunkAPI) => {
    const result = await postApi.deletePostsForMe(params);
    await thunkAPI.dispatch(getListPostsForMe());
    return result;
  }
);

export const getComment = createAsyncThunk(
  "post/getComment",
  async (params) => {
    const result = await postApi.getComment(params);
    return result;
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (params) => {
    const result = await postApi.updatePost({
      id: params.id,
      content: params.content,
      title: params.title,
    });
    return result;
  }
);

export const checkLike = createAsyncThunk("post/checkLike", async (params) => {
  const result = await postApi.checkLike({
    likeType: params.likeType,
    postId: params.postId,
  });
  return result;
});

export const addComment = createAsyncThunk(
  "post/addComment",
  async (params, thunkAPI) => {
    const result = await postApi.addComment({
      content: params.content,
      postId: params.postId,
      parentId: params.parentId,
    });
    thunkAPI.dispatch(getComment({ postId: params.postId }));
    return result;
  }
);

export const getAllPosts = createAsyncThunk("post/getAll", async () => {
  const result = await postApi.getAllPosts();
  return result;
});

const initialState = {
  postForMe: [],
  post: {},
  allPosts: [],
  likes: 0,
  comments: [],
  isLike: false,
  loading: false,
};

export const postSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [getListPostsForMe.pending]: (state) => {
      state.postForMe = [];
      console.log("ok");
      state.loading = true;
    },
    [getListPostsForMe.rejected]: (state, action) => {
      state.loading = false;
    },
    [getListPostsForMe.fulfilled]: (state, action) => {
      if (!action.payload.error) {
        state.loading = false;
        console.log(action);
        state.postForMe = action.payload.posts;
      }
      console.log(action.payload.error);
    },
    [getOnePost.fulfilled]: (state, action) => {
      state.post = action.payload.post || action.payload;
      state.likes = action.payload.post.likes;
    },
    [checkLike.rejected]: (state, action) => {},
    [checkLike.fulfilled]: (state, action) => {
      state.isLike = action.payload.isLike;
    },
    [like.fulfilled]: (state, action) => {
      if (action.payload.type === "LIKE") {
        state.likes += 1;
        state.isLike = true;
      } else {
        state.likes -= 1;
        state.isLike = false;
      }
    },
    [getComment.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.comments = action.payload.comments;
      }
      // state.comments = [];
    },
    [getAllPosts.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.allPosts = action.payload.posts;
      }
    },
  },
});

// Action creators are generated for each case reducer function
// export const {   } = postSlice.actions;

export default postSlice.reducer;
