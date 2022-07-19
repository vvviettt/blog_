import UpdatePost from "~/pages/UpdatePost";
import Account from "~/layouts/Account";
import Main from "~/layouts/Main";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Post from "~/pages/Post";
import Register from "~/pages/Register";
import Write from "~/pages/Write";
import Posts from "~/pages/Posts";

export const routes = [
  { path: "/", page: Home, layout: Main },
  { path: "/account/login", page: Login, layout: Account },
  { path: "/account/register", page: Register, layout: Account },
  { path: "/account/register", page: Register, layout: Account },
  { path: "/p", page: Post, layout: Main },
];

export const privateRoutes = [
  { path: "/user/posts", page: Posts, layout: Main },
  { path: "/user/write", page: Write, layout: Main },
  { path: "/user/updatePost", page: UpdatePost, layout: Main },
];
