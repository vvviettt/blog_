import logo from "~/assets/images/logo.svg";
function Account({ children }) {
  return (
    <div className="max-w-[1140px] my-3 m-auto">
      <div className="flex justify-center mb-2 p-4">
        <input className="h-10" type="image" alt="" src={logo} />
      </div>
      <div className="max-w-[50%] px-4 m-auto">
        <div className="p-5 shadow-lg">{children}</div>
      </div>
    </div>
  );
}

export default Account;
