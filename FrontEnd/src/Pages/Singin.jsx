import Signincard from "../components/SigninCard";
import Logo from "../assets/Logos-icons/Logo-gdg-algiers2.png";

const Signin = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <img src={Logo} alt="Logo" className="mb-6" />
        <Signincard></Signincard>
      </div>
    </>
  );
};

export default Signin;
