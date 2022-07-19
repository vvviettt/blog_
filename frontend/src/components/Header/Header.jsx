import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "~/assets/images/logo.svg";
import RightHeader from "./RightHeader";

function Header() {
  const user = useSelector((state) => state.auth);

  return (
    <div className="shadow-2xl sticky top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-[1140px] m-auto h-[60px] py-4">
        <div className="flex items-center justify-between">
          <div className="flex align-center">
            <div className="pr-6">
              <Link to="/">
                <input className="h-7 " type="image" src={logo} alt="" />
              </Link>
            </div>
          </div>
          <RightHeader user={user} />
        </div>
      </div>
    </div>
  );
}

export default Header;
