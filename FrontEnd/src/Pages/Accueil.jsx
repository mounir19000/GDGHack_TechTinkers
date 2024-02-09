// Import library
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// import assets
import Logo from "../assets/Logos-icons/Logo-gdg-algiers.png";
import SideImage from "../assets/Side_image.png";

// Import compo and pages
import EventCard from "../components/EventCard";

const Accueil = () => {
  const initialEventsToShow = 9; // Initial number of events to show
  const [eventsToShow, setEventsToShow] = useState(initialEventsToShow);
  const [allEvents, setAllEvents] = useState([]);

  // Dummy data for events (you can replace it with your actual data)
  const dummyEvents = [
    {
      EventTitle: "GDG Hack 1",
      EventDiscription: "Description for GDG Hack 1",
      isIntern: true,
      isHackathon: true,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 1",
      time: "14:30",
      timeLeft: "12:50",
    },
    {
      EventTitle: "GDG Hack 2",
      EventDiscription: "Description for GDG Hack 2",
      isIntern: false,
      isHackathon: true,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 2",
      time: "15:45",
      timeLeft: "10:30",
    },
    {
      EventTitle: "GDG Hack 3",
      EventDiscription: "Description for GDG Hack 3",
      isIntern: true,
      isHackathon: false,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 3",
      time: "18:00",
      timeLeft: "Finished",
    },
    // Add more events as needed
    {
      EventTitle: "GDG Workshop 4",
      EventDiscription: "Description for GDG Workshop 4",
      isIntern: true,
      isHackathon: false,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 4",
      time: "10:00",
      timeLeft: "1 day left",
    },
    {
      EventTitle: "GDG Meetup 5",
      EventDiscription: "Description for GDG Meetup 5",
      isIntern: false,
      isHackathon: false,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 5",
      time: "19:30",
      timeLeft: "2 hours left",
    },
    {
      EventTitle: "GDG Seminar 6",
      EventDiscription: "Description for GDG Seminar 6",
      isIntern: true,
      isHackathon: true,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 6",
      time: "16:15",
      timeLeft: "Finished",
    },
    {
      EventTitle: "GDG CodeJam 7",
      EventDiscription: "Description for GDG CodeJam 7",
      isIntern: false,
      isHackathon: true,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 7",
      time: "14:00",
      timeLeft: "3 days left",
    },
    {
      EventTitle: "GDG Tech Talk 8",
      EventDiscription: "Description for GDG Tech Talk 8",
      isIntern: true,
      isHackathon: false,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 8",
      time: "17:45",
      timeLeft: "1 hour left",
    },
    {
      EventTitle: "GDG Conference 9",
      EventDiscription: "Description for GDG Conference 9",
      isIntern: false,
      isHackathon: false,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 9",
      time: "11:30",
      timeLeft: "Finished",
    },
    {
      EventTitle: "GDG Hack 1",
      EventDiscription: "Description for GDG Hack 1",
      isIntern: true,
      isHackathon: true,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 1",
      time: "14:30",
      timeLeft: "12:50",
    },
    {
      EventTitle: "GDG Hack 2",
      EventDiscription: "Description for GDG Hack 2",
      isIntern: false,
      isHackathon: true,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 2",
      time: "15:45",
      timeLeft: "10:30",
    },
    {
      EventTitle: "GDG Hack 3",
      EventDiscription: "Description for GDG Hack 3",
      isIntern: true,
      isHackathon: false,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 3",
      time: "18:00",
      timeLeft: "Finished",
    },
    // Add more events as needed
    {
      EventTitle: "GDG Workshop 4",
      EventDiscription: "Description for GDG Workshop 4",
      isIntern: true,
      isHackathon: false,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 4",
      time: "10:00",
      timeLeft: "1 day left",
    },
    {
      EventTitle: "GDG Meetup 5",
      EventDiscription: "Description for GDG Meetup 5",
      isIntern: false,
      isHackathon: false,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 5",
      time: "19:30",
      timeLeft: "2 hours left",
    },
    {
      EventTitle: "GDG Seminar 6",
      EventDiscription: "Description for GDG Seminar 6",
      isIntern: true,
      isHackathon: true,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 6",
      time: "16:15",
      timeLeft: "Finished",
    },
    {
      EventTitle: "GDG CodeJam 7",
      EventDiscription: "Description for GDG CodeJam 7",
      isIntern: false,
      isHackathon: true,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 7",
      time: "14:00",
      timeLeft: "3 days left",
    },
    {
      EventTitle: "GDG Tech Talk 8",
      EventDiscription: "Description for GDG Tech Talk 8",
      isIntern: true,
      isHackathon: false,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 8",
      time: "17:45",
      timeLeft: "1 hour left",
    },
    {
      EventTitle: "GDG Conference 9",
      EventDiscription: "Description for GDG Conference 9",
      isIntern: false,
      isHackathon: false,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 9",
      time: "11:30",
      timeLeft: "Finished",
    },
  ];

  // Load all events on component mount
  useEffect(() => {
    setAllEvents(dummyEvents);
  }, []);

  // Function to handle "See more events" button click
  const handleSeeMoreClick = () => {
    setEventsToShow(eventsToShow + 3); // Increase the number of events to show
  };

  return (
    <>
      <div className="flex flex-col h-[100vh] bg-[#011225]">
        <div className=" flex flex-row items-center justify-between w-full px-16 py-6 ">
          <img src={Logo} alt="Logo" className="h-10 " />
          <div className="flex flex-row justify-center items-center gap-6">
            <Link to="/Signup">
              <button className="w-52 h-10 px-3 py-1 font-bold bg-[#2B82FB]  border-none text-white  rounded-lg">
                Sign-up
              </button>
            </Link>
            <Link to="/Signin">
              <button className="w-52 h-10 px-3 py-1 font-bold bg-[#F9AB00] border-none  text-white rounded-lg">
                Sign-in
              </button>
            </Link>
          </div>
        </div>

        <div className=" flex-1 flex justify-between items-center mx-16 ">
          {/* Image div */}
          <div className="w-[50%] flex justify-start items-center">
            <img src={SideImage} className="w-[40vw]" alt="doctor" />
          </div>

          {/* Text Div */}
          <div className="w-[50%] flex-col items-start space-y-10">
            <h3 className="text-[3.75rem] text-[#C2B4B4] leading-tight font-bold my-4 ">
              GDG Events managment
            </h3>

            <p className="text-[#C2B4B4] text-[1.5rem] w-full text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore .
            </p>

            <button
              className="text-white w-170 h-30 px-4 py-2 font-bold bg-[#F9AB00] border 
            border-[#00CED0] text-xl rounded-lg my-10 animate-bounce "
            >
              See our events
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-16 min-h-[100vh] bg-[#011225]">
        <h1 className="mb-4 font-bold text-5xl text-[#ffffff]">Our events</h1>

        {/* Show the grid of EventCard components */}
        <div className="grid grid-cols-3 gap-6">
          {allEvents.slice(0, eventsToShow).map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>

        {/* Show "See more events" button conditionally */}
        {eventsToShow < allEvents.length && (
          <button
            className="text-white w-80 h-30 px-3 py-2 font-bold bg-[#F9AB00] border 
            border-[#00CED0] text-xl rounded-lg mt-4"
            onClick={handleSeeMoreClick}
          >
            See more events
          </button>
        )}
      </div>
    </>
  );
};

export default Accueil;
