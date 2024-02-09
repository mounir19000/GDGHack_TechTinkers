// Import library
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// import assets
import Logo from "../assets/Logos-icons/Logo-gdg-algiers.png";
import Pfp from "../assets/Logos-icons/Profile.png";

// Import compo and pages
import EventCardUser from "../components/EventCardUser";

const UserPage = () => {
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

  const user = { username: "Mounir", isInterne: true };

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
      <div className="flex flex-col bg-[#011225]">
        <div className=" flex flex-row items-center justify-between w-full px-16 py-6 ">
          <img src={Logo} alt="Logo" className="h-10 " />
          <div className="flex justify-center items-center space-x-3">
            <p className="text-white text-xl text-center">{user.username}</p>
            <img src={Pfp} alt="Pfp" className="h-10 w-10" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center px-16 bg-[#011225]">
          <h1 className="mb-6 font-bold text-5xl text-[#ffffff]">Our events</h1>

          {/* Show the grid of EventCard components */}
          <div className="grid grid-cols-3 gap-6">
            {allEvents.slice(0, eventsToShow).map((event, index) => (
              <EventCardUser key={index} {...event} user={user} />
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
      </div>
    </>
  );
};

export default UserPage;
