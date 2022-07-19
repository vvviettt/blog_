import classNames from "classnames";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

import avatar from "~/assets/images/avatar_default.webp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "~/features/authSlice";
function RightHeader({ user }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  if (user.isLoggedIn) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex mr-5 ">
          <Link
            className="flex group relative w-8 h-8 rounded-full justify-center items-center hover:bg-slate-500"
            to="/user/write"
          >
            <span>
              <FontAwesomeIcon icon={faFeather} />
            </span>
            <p className="absolute hidden group-hover:block top-full mt-1 rounded-lg right-1/2 translate-x-1/2 w-20 text-center bg-slate-500">
              Viết bài
            </p>
          </Link>
        </div>
        <div
          className="flex align-center relative"
          onClick={() => {
            setShow(!show);
          }}
        >
          <img
            className="w-9 h-9  cursor-pointer rounded-full overflow-hidden"
            src={avatar}
            alt=""
          ></img>
          <div
            className={classNames(
              "absolute   rounded-lg shadow-sm bg-slate-300 top-full right-1/2 translate-x-[50%]  p-4 w-60",
              { block: show, hidden: !show }
            )}
          >
            <div className="flex items-center ">
              <img
                className=" rounded-full w-10 h-10 "
                src={avatar}
                alt=""
              ></img>
              <p className=" pl-2">{user.name}</p>
            </div>
            <ul>
              <li className="mt-3 cursor-pointer">
                <Link
                  className="py-2 px-2 w-full block  rounded-lg hover:bg-white"
                  to="/user/posts"
                >
                  Bài viết
                </Link>
              </li>
              <li
                className="py-2 px-2 mt-3 rounded-lg hover:bg-white cursor-pointer"
                onClick={() => {
                  logoutHandler();
                }}
              >
                <span>Đăng xuất</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return <Link to="/account/login">Đăng ký / Đăng nhập</Link>;
}

export default RightHeader;
