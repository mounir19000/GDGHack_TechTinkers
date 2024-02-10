// Import library
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// import assets
import Logo from "../assets/Logos-icons/Logo-gdg-algiers.png";
import Pfp from "../assets/Logos-icons/Profile.png";
import SearchLogo from "../assets/Logos-icons/search.svg";

// Import compo and pages
import EventCardUser from "../components/EventCardUser";

const UserPage = () => {
  const initialEventsToShow = 9; // Initial number of events to show
  const [eventsToShow, setEventsToShow] = useState(initialEventsToShow);
  const [allEvents, setAllEvents] = useState([]);

  // Dummy data for events (you can replace it with your actual data)

  return (
    <>
      <div className="flex flex-col bg-[#011225]">
        <div className=" flex flex-row items-center justify-between w-full px-16 py-6 ">
          <img src={Logo} alt="Logo" className="h-12 " />
          <div className="flex justify-center items-center space-x-3">
            <p className="text-white text-xl text-center">{user.username}</p>
            <img src={Pfp} alt="Pfp" className="h-10 w-10" />
          </div>
        </div>

        <div className="flex flex-col justify-center align-center">
          <div className="max-w-[50vw]">
            <h1></h1>
            <p></p>
          </div>
          <div className="max-w-[50vw]">
            {/* gps emplimentation */}
            <p></p>
          </div>
        </div>
        <div>
          <h1>Orgenizers</h1>
          {/* Loop throw a list of orgenizers and show them in a components */}
        </div>
        <div>
          <h1>Mentors</h1>
          {/* Loop throw a list of mentors and show them in a components */}
        </div>
        <div>
          <h1>Sponsors</h1>
          {/* create a grid of the sponsors image */}
        </div>
        <div>
          <h1>Agenda</h1>
          {/* show pics of the agenda */}
        </div>
      </div>

    </>
  );
};

export default UserPage;
