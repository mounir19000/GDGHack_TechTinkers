import Logo from "../assets/Logos-icons/Logo-gdg-algiers.png";
import SignupCard from "../components/SignupCard";

const Signup = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <img src={Logo} alt="Logo" className="mb-6" />
        <SignupCard></SignupCard>
      </div>
    </>
  );
};

export default Signup;
