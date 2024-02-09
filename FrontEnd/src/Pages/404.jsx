import { Link } from "react-router-dom";
import Logo from "../assets/Logos-icons/Logo-gdg-algiers.png";

const Error = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <img className="mb-12" src={Logo} alt="Logo" />
        <div className="max-w-[40%] border border-solid border-[#2D4642] rounded-xl px-10 py-8 mb-4">
          <h1 className="text-5xl text-center mb-4 text-[#818C8B]">404</h1>
          <p className="text-[#818C8B] text-3xl text-center">
            Sorry. The content you`re looking for doesn`t exist. Either it was
            removed, or you mistyped the link.
          </p>
        </div>
        <div className="flex space-x-5">
          <Link to="/" className="bg-[#00CED0] h-12 py-1 px-12 rounded-xl">
            <h1 className="text-[#ffffff] py-2">Go to homepage</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
